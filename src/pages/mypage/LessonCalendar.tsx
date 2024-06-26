import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Topbar } from '../../components/common/Topbar';
import { MyCalendar } from '../../components/molecules/MyCalendar';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { useState } from 'react';
import { LessonDetail } from '../../components/molecules/LessonDetail';

export const LessonCalendar = () => {
  const navigate = useNavigate();

  const [selectedLesson, setSelectedLesson] = useState<LessonType[]>([]);
  const [selectedLessonDetail, setSelectedLessonDetail] =
    useState<LessonDetailType>();

  const { data: allLessons } = useQuery({
    queryKey: ['allLessons'],
    queryFn: async () => {
      const response = await ApiClient.getMyLessonAll();
      return response;
    },
  });

  const handleClassDetail = async (lesson_id: number) => {
    const { data: lessonDetail } = useQuery({
      queryKey: ['lessonDetails'],
      queryFn: async () => {
        const response = await ApiClient.getLessonDetail(lesson_id);
        return response;
      },
    });
    setSelectedLessonDetail(lessonDetail);
  };

  return (
    <div>
      <Topbar title='신청 클래스 일정' onClick={() => navigate('/mypage')} />
      <MyCalendar
        data={allLessons || []}
        setSelectedLesson={setSelectedLesson}
      />
      <div className='m-5'>
        <p className='font-hanaMedium text-xl ml-1'>나의 일정 모아보기</p>
        <div className='mt-3 px-5 py-4 w-[351px] h-[122px] bg-white rounded-2xl border-[1px] border-hanaSilver overflow-y-auto'>
          {selectedLesson.length > 0 ? (
            selectedLesson.map((lesson) => (
              <p
                key={lesson.lesson_id}
                className='font-hanaRegular text-base cursor-pointer'
                onClick={() => handleClassDetail(lesson.lesson_id)}
              >
                {lesson.title}
              </p>
            ))
          ) : (
            <p className='flex font-hanaRegular text-center items-center justify-center text-s text-hanaSilver'>
              예약 일정이 없습니다.
            </p>
          )}
        </div>
        <p className='font-hanaMedium text-xl mt-5 ml-1'>클래스 상세 정보</p>
        <LessonDetail />
      </div>
      <Navbar />
    </div>
  );
};
