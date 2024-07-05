import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { LessonContainer } from '../../components/molecules/LessonContainer';
import { Button } from '../../components/common/Button';
import { IoIosArrowDown, IoIosArrowUp, IoMdCopy } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { Alarm } from '../../components/molecules/Alarm';
import { ModalBottomContainer } from '../../components/organisms/ModalBottomContainer';
import { LessonDateChoice } from '../../components/molecules/LessonDateChoice';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { Loading } from '../Loading';

export const LessonDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { lessonId } = useParams();
  const [shownotice, setShowNotice] = useState<boolean>(false);
  const [copyLocation, setCopyLocation] = useState<boolean>(false);
  const [materials, setMaterials] = useState<string[]>([]);
  const [choiceModal, setChoiceModal] = useState<boolean>(false);
  const { isLoading: isGetLessonLoading, data: lesson } = useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => {
      if (lessonId) {
        const res = ApiClient.getInstance().getLessonDetail(+lessonId);
        return res;
      }
    },
    enabled: !!lessonId,
  });

  const { isLoading: isGetLessonDateLoading, data: lessonDateList } = useQuery({
    queryKey: ['lessonDate', lessonId],
    queryFn: () => {
      if (lessonId) {
        const res = ApiClient.getInstance().getLessonDate(+lessonId);
        return res;
      }
    },
    enabled: !!lessonId,
  });

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyLocation(true);
    } catch (e) {
      alert('클립보드 복사 실패');
      return false;
    }
  };

  const splitMaterials = (materials: string) => {
    setMaterials(
      materials
        .split(',')
        .filter((material) => material !== '')
        .map((material) => material.trim())
    );
  };

  useEffect(() => {
    if (lesson?.data && lesson.data?.materials !== '')
      splitMaterials(lesson.data.materials);
  }, [lesson]);

  if (isGetLessonLoading || isGetLessonDateLoading) return <Loading />;

  return (
    <>
      {copyLocation && (
        <Alarm
          message='주소가 복사되었습니다.'
          showAlarm={copyLocation}
          onClickShowAlarm={(status: boolean) => setCopyLocation(status)}
        />
      )}
      {lessonId && lessonDateList?.data && lesson?.data && choiceModal && (
        <ModalBottomContainer
          color='#FFFFFF'
          onClose={() => setChoiceModal(false)}
        >
          <div className='font-hanaBold text-lg'>
            하나의 일정을 선택해주세요.
          </div>
          <LessonDateChoice
            lessonId={+lessonId}
            dateList={lessonDateList?.data}
            price={lesson?.data?.price}
          />
        </ModalBottomContainer>
      )}
      <Topbar
        title='원데이 클래스'
        onClick={() => {
          state && state.prev === 'pay' ? navigate(-3) : navigate(-1);
        }}
      />
      <div className='w-full h-64 overflow-hidden object-fill'>
        <img
          src={lesson?.data?.image}
          alt='클래스이미지'
          className='w-full h-full'
        />
      </div>
      <div className='w-full bg-white p-4 text-sm font-hanaMedium'>
        <h1 className='font-hanaMedium text-xl mb-1'>{lesson?.data?.title}</h1>
        <span className='text-xl font-hanaBold'>
          {lesson?.data?.price.toLocaleString()}{' '}
        </span>
        원
      </div>
      <LessonContainer title='클래스 소개'>
        <p className='font-hanaRegular text-base'>
          {lesson?.data?.description}
        </p>
      </LessonContainer>
      <LessonContainer title='진행하는 장소'>
        <div className='flex justify-between items-center'>
          <p className='font-hanaRegular text-base'>{lesson?.data?.location}</p>
          <div
            className='w-9 h-9 border-[0.5px] border-hanaSilver flex justify-center items-center rounded cursor-pointer'
            onClick={() => {
              if (lesson?.data) handleCopyClipBoard(lesson?.data?.location);
            }}
          >
            <IoMdCopy size={18} color='#B5B5B5' />
          </div>
        </div>
      </LessonContainer>
      <LessonContainer title='준비물'>
        <div className='flex items-center gap-3 flex-wrap'>
          {materials.map((material, index) => (
            <span
              key={index}
              className='bg-[#D9E8E6] border-[0.7px] px-2 py-1 border-hanaGreen rounded-2xl text-hanaGreen font-hanaMedium'
            >
              {material}
            </span>
          ))}
        </div>
      </LessonContainer>
      <LessonContainer title='환불정책'>
        {!shownotice ? (
          <IoIosArrowDown
            size={20}
            color='#B5B5B5'
            className='absolute top-4 right-3 cursor-pointer'
            onClick={() => setShowNotice(true)}
          />
        ) : (
          <IoIosArrowUp
            size={20}
            color='#B5B5B5'
            className='absolute top-4 right-3 cursor-pointer'
            onClick={() => setShowNotice(false)}
          />
        )}
        {shownotice && (
          <p className='font-hanaRegular text-sm whitespace-pre-line leading-3'>
            {`1. 결제 후 클래스 시작 하루 전 취소 시 : 전액환불\n
            2. 결제 후 클래스 당일 취소 시 : 환불불가\n
            \n
            [환불 신청 방법]\n
            1. 해당 클래스 결제한 계정으로 로그인\n
            2. 마이페이지 - 신청 클래스`}
          </p>
        )}
      </LessonContainer>
      <div className='mt-28'>
        <Button
          message={lessonDateList?.data?.length !== 0 ? '신청하기' : '예약마감'}
          isActive={
            lessonDateList?.data?.length !== 0
              ? !lesson?.data?.hostMe
                ? true
                : false
              : false
          }
          onClick={() => setChoiceModal(true)}
        />
      </div>
    </>
  );
};
