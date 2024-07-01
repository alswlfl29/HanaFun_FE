import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Topbar } from '../../components/common/Topbar';
import { MyCalendar } from '../../components/molecules/MyCalendar';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { useEffect, useState } from 'react';
import { LessonDetail } from '../../components/molecules/LessonDetail';
import { LessonList } from '../../components/molecules/LessonList';

export const LessonCalendar = () => {
  const navigate = useNavigate();

  const [selectedLesson, setSelectedLesson] = useState<LessonType[]>([]);
  const [selectedLessonDetail, setSelectedLessonDetail] =
    useState<LessonDetailType>();
  const [calendarData, setCalendarData] = useState<CalendarDataType[]>([]);

  const { data: allLessons } = useQuery({
    queryKey: ['allLessons'],
    queryFn: async () => {
      const response = await ApiClient.getMyLessonAll();
      return response;
    },
  });

  useEffect(() => {
    if (allLessons) {
      const formattedData = allLessons.map((lesson: LessonType) => ({
        lesson_id: lesson.lesson_id,
        date: lesson.date,
      }));
      setCalendarData(formattedData);
    }
  }, [allLessons]);

  console.log('출력', allLessons);

  const handleLessonDetail = async (lesson_id: number) => {
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
        data={calendarData || []}
        setSelectedLesson={(lessons: CalendarDataType[]) => {
          const selectedLessons = allLessons?.filter((lesson: LessonType) =>
            lessons.some(
              (selectedLesson) => selectedLesson.lesson_id === lesson.lesson_id
            )
          );
          setSelectedLesson(selectedLessons);
        }}
      />
      <div className='m-5'>
        <p className='font-hanaMedium text-xl ml-1'>나의 일정 모아보기</p>
        <LessonList
          selectedLesson={selectedLesson}
          handleLessonDetail={handleLessonDetail}
        />
        <p className='font-hanaMedium text-xl mt-5 ml-1'>클래스 상세 정보</p>
        <LessonDetail />
      </div>
    </div>
  );
};
