import { GrFormNext } from 'react-icons/gr';
import { UserInfo } from '../../components/molecules/UserInfo';
import { useNavigate } from 'react-router-dom';
import { LessonSlider } from '../../components/organisms/LessonSlider';
import { ApiClient } from '../../apis/apiClient';
import { useQuery } from '@tanstack/react-query';
import { NotFindMyLesson } from '../../components/molecules/NotFindMyLesson';

const MyPage = () => {
  const username = '오감자';
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/my-lesson-list');
  };

  // data 가져오기
  const { data: myLessons } = useQuery({
    queryKey: ['myLessons'],
    queryFn: async () => {
      const response = await ApiClient.getMyLesson();
      return response;
    },
  });
  const lessons = myLessons?.lessons;
  const point = myLessons?.point;

  return (
    <div className='pt-6 px-5 pb-7'>
      <p className='font-hanaBold text-xl'>마이페이지</p>
      <UserInfo username={username} hanaMoney={point} />
      <div className='flex justify-between mt-5'>
        <div
          className='w-[164px] h-[156px] bg-white rounded-2xl shadow-md cursor-pointer'
          onClick={() => navigate('/lesson-calendar')}
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
          onClick={() => navigate('/host')}
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
