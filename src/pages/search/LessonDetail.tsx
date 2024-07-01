import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { LessonContainer } from '../../components/molecules/LessonContainer';
import { Button } from '../../components/common/Button';
import { IoIosArrowDown, IoIosArrowUp, IoMdCopy } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { Alarm } from '../../components/molecules/Alarm';
import { ModalBottomContainer } from '../../components/organisms/ModalBottomContainer';
import { LessonDateChoice } from '../../components/molecules/LessonDateChoice';

const data = {
  lesson_id: 1,
  image: 'https://picsum.photos/200/200',
  title: '헨리가 나혼자 탄 한강 카약',
  price: 50000,
  description: '클래스 소개글',
  location: '한강',
  materials: '즐거운 마음, 자신감, ㄹ랄랄랄, 라랄라라, 라아리아니라ㅣ나린',
  capacity: 10,
  category_name: '베이킹',
};

const dateData = [
  {
    lessondate_id: 1,
    date: '2024-06-23',
    start_time: '2024-06-23 14:00:00',
    end_time: '2024-06-23 15:00:00',
    quantityLeft: 10, // 잔여수량 (모집인원 - 신청인원)
  },
  {
    lessondate_id: 2,
    date: '2024-06-28',
    start_time: '2024-06-28 15:00:00',
    end_time: '2024-06-28 16:00:00',
    quantityLeft: 10, // 잔여 수량
  },
];

export const LessonDetail = () => {
  const navigate = useNavigate();
  const [shownotice, setShowNotice] = useState<boolean>(false);
  const [copyLocation, setCopyLocation] = useState<boolean>(false);
  const [materials, setMaterials] = useState<string[]>([]);
  const [choiceModal, setChoiceModal] = useState<boolean>(false);

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
    setMaterials(materials.split(',').map((material) => material.trim()));
  };

  useEffect(() => {
    splitMaterials(data.materials);
  }, []);

  return (
    <>
      {copyLocation && (
        <Alarm
          message='주소가 복사되었습니다.'
          showAlarm={copyLocation}
          onClickShowAlarm={(status: boolean) => setCopyLocation(status)}
        />
      )}
      {choiceModal && (
        <ModalBottomContainer
          color='#FFFFFF'
          onClose={() => setChoiceModal(false)}
        >
          <div className='font-hanaBold text-lg'>
            하나의 일정을 선택해주세요.
          </div>
          <LessonDateChoice dateList={dateData} price={data.price} />
        </ModalBottomContainer>
      )}
      <Topbar title='원데이 클래스' onClick={() => navigate(-1)} />
      <div className='w-full h-64 overflow-hidden object-fill'>
        <img src={data.image} alt='클래스이미지' className='w-full h-full' />
      </div>
      <div className='w-full bg-white p-4 text-sm font-hanaMedium'>
        <h1 className='font-hanaMedium text-xl mb-1'>{data.title}</h1>
        <span className='text-xl font-hanaBold'>
          {data.price.toLocaleString()}{' '}
        </span>
        원
      </div>
      <LessonContainer title='클래스 소개'>
        <p className='font-hanaRegular text-base'>{data.description}</p>
      </LessonContainer>
      <LessonContainer title='진행하는 장소'>
        <div className='flex justify-between items-center'>
          <p className='font-hanaRegular text-base'>{data.location}</p>
          <div
            className='w-9 h-9 border-[0.5px] border-hanaSilver flex justify-center items-center rounded cursor-pointer'
            onClick={() => handleCopyClipBoard(data.location)}
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
          message='신청하기'
          isActive={true}
          onClick={() => setChoiceModal(true)}
        />
      </div>
    </>
  );
};
