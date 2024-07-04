import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { LessonSlider } from '../../components/organisms/LessonSlider';
import moment from 'moment';

export const MyLessonList = () => {
  const navigate = useNavigate();

  // 나의 신청 클래스 출력 api 연결
  const { data: allLessons } = useQuery({
    queryKey: ['allLessons'],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getMyLessonAll();
      console.log('신청 클래스 api 호출 : ', response.data);
      return response.data;
    },
    retry: 1,
  });

  const today = moment().format('YYYY-MM-DD');
  const prevLesson =
    allLessons?.filter((lesson) => moment(lesson.date).isBefore(today)) || [];
  const todayLesson =
    allLessons?.filter((lesson) => moment(lesson.date).isSame(today)) || [];
  const nextLesson =
    allLessons?.filter((lesson) => moment(lesson.date).isAfter(today)) || [];

  return (
    <div className='font-hanaMedium'>
      <Topbar title='신청 클래스' onClick={() => navigate('/mypage')} />
      <div className='mt-6 ml-5'>
        <div>
          <p>오늘의 클래스</p>
          <LessonSlider data={todayLesson} show={true} option='single' />
        </div>
        <div className='mt-5'>
          <p>나의 예약 클래스</p>
          <LessonSlider data={nextLesson} show={true} option='double' />
        </div>
        <div className='mt-5'>
          <p>수강한 클래스</p>
          <LessonSlider data={prevLesson} show={true} option='single' />
        </div>
      </div>
    </div>
  );
};
