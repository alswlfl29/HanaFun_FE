import { GrFormNext } from 'react-icons/gr';
import { UserInfo } from '../../components/molecules/UserInfo';
import { useNavigate } from 'react-router-dom';
import { LessonSlider } from '../../components/organisms/LessonSlider';
import { ApiClient } from '../../apis/apiClient';
import { useQuery } from '@tanstack/react-query';
import { NotFindMyLesson } from '../../components/molecules/NotFindMyLesson';
import { Loading } from '../Loading';
import { ErrorPage } from '../ErrorPage';
import { getCookie } from '../../utils/cookie';
import { useModal } from '../../context/ModalContext';

const MyPage = () => {
  const username = getCookie('username');
  const navigate = useNavigate();
  const { openModal } = useModal();

  const handleNavigate = () => {
    navigate('/mypage/my-lesson-list');
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('ko-KR').format(value);
  };

  // 마이페이지 출력 api
  const {
    data: myLessons,
    isLoading: listLoading,
    error: listError,
  } = useQuery({
    queryKey: ['myLessons'],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getMyLesson();
      return response;
    },
  });
  const lessons = myLessons?.data?.lessons;

  // 하나머니 호출 api
  const {
    data: point,
    isLoading: moneyLoading,
    error: moneyError,
  } = useQuery({
    queryKey: ['point'],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getPoint();
      return response.data;
    },
  });

  // 호스트 여부 판단
  const { data: isHostData } = useQuery({
    queryKey: ['isHost', getCookie('token')],
    queryFn: () => {
      const res = ApiClient.getInstance().getIsHost();
      return res;
    },
    retry: 1,
  });
  const handleHostPage = () => {
    if (isHostData?.data?.isHost) {
      navigate('/mypage/host');
    } else {
      // 모달 열기
      openModal('호스트 등록을 먼저 진행해주세요!', () =>
        navigate('/open-lesson')
      );
    }
  };

  if (listLoading || moneyLoading) {
    return <Loading />;
  }

  if (listError || moneyError) {
    return <ErrorPage />;
  }

  return (
    <div className='pt-6 px-5 pb-7'>
      <p className='font-hanaBold text-xl'>마이페이지</p>
      <UserInfo
        username={username}
        hanaMoney={formatNumber(Number(point?.point) || 0)}
      />
      <div className='flex justify-between mt-5'>
        <div
          className='w-[164px] h-[156px] bg-white rounded-2xl shadow-md cursor-pointer'
          onClick={() => navigate('/mypage/lesson-calendar')}
        >
          <p className='font-hanaMedium text-base mt-6 ml-5'>
            신청 클래스 일정
          </p>
          <img
            src='../images/mypage/calendar.png'
            alt='calendar'
            className='w-[110px] h-[110px] ml-14'
          />
        </div>
        <div
          className='w-[164px] h-[156px] bg-white rounded-2xl shadow-md cursor-pointer'
          onClick={handleHostPage}
        >
          <img
            src='../images/mypage/pencil.png'
            alt='calendar'
            className='w-[68px] h-[74px] mt-5 ml-3'
          />
          <p className='font-hanaMedium text-base ml-9 mt-5'>
            개설 클래스 관리
          </p>
        </div>
      </div>
      <div className='mt-6 flex justify-between items-center'>
        <p className='font-hanaMedium text-base'>나의 신청 클래스</p>
        <GrFormNext
          className='w-5 h-6 cursor-pointer'
          onClick={handleNavigate}
        />
      </div>
      {lessons && lessons.length > 0 ? (
        <LessonSlider data={lessons} show={false} option='single' />
      ) : (
        <NotFindMyLesson />
      )}
    </div>
  );
};

export default MyPage;
