import { useNavigate, useParams } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { MyCalendar } from '../../components/molecules/MyCalendar';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { LessonList } from '../../components/molecules/LessonList';
import { LessonDetail } from '../../components/molecules/LessonDetail';
import { ApplicantList } from '../../components/organisms/ApplicantList';

export const HostLessonCalendar = () => {
  const navigate = useNavigate();
  // const { lesson_id } = useParams(); // 실제 사용 시 URL에서 lesson_id를 가져옴
  const lesson_id = 1; // 임시로 설정한 값, 실제로는 useParams()로 가져옴
  const [selectedLesson, setSelectedLesson] = useState<HostLessonDetailType[]>(
    []
  );
  const [calendarData, setCalendarData] = useState<CalendarDataType[]>([]);

  const { data: hostLessonDetail } = useQuery({
    queryKey: ['hostLessonDetail'],
    queryFn: async () => {
      const response = await ApiClient.getHostLessonDetail();
      return response;
    },
  });

  const { data: lessonDetail } = useQuery({
    queryKey: ['lessonDetail', lesson_id],
    queryFn: async () => {
      const response = await ApiClient.getLessonDetail(lesson_id);
      return response;
    },
    enabled: !!lesson_id,
  });

  const fetchLessonDetail = async (lesson_id: number) => {
    const response = await ApiClient.getLessonDetail(lesson_id);
    return response;
  };

  const handleLessonDetail = async (lesson_id: number) => {
    const lessonDetail = await fetchLessonDetail(lesson_id);
    console.log('Lesson Detail:', lessonDetail);
    console.log('lessondate_id: ', selectedLesson[lesson_id - 1].lessondate_id);
  };

  useEffect(() => {
    if (hostLessonDetail) {
      const formattedData = hostLessonDetail.map(
        (lesson: HostLessonDetailType) => ({
          lesson_id: lesson.lesson_id,
          date: lesson.date,
        })
      );
      setCalendarData(formattedData);
    }
  }, [hostLessonDetail]);

  useEffect(() => {
    console.log('Selected Lesson:', selectedLesson);
  }, [selectedLesson]);

  useEffect(() => {
    if (lesson_id && hostLessonDetail) {
      const selectedLessonDetail = hostLessonDetail.find(
        (lesson: HostLessonDetailType) => lesson.lesson_id === lesson_id
      );
      if (selectedLessonDetail) {
        setSelectedLesson([selectedLessonDetail]);
      }
    }
  }, [lesson_id, hostLessonDetail]);

  return (
    <div>
      <Topbar
        title={lessonDetail ? lessonDetail.title : '클래스 이름'}
        onClick={() => navigate('/mypage/host')}
      />
      <MyCalendar
        data={calendarData || []}
        setSelectedLesson={(lessons: CalendarDataType[]) => {
          const selectedLessons = hostLessonDetail.filter(
            (lesson: HostLessonDetailType) =>
              lessons.some(
                (selectedLesson) =>
                  selectedLesson.lesson_id === lesson.lesson_id
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
        <ApplicantList />
        <p className='font-hanaMedium text-xl mt-5 ml-1'>클래스 상세 정보</p>
        <LessonDetail />
      </div>
    </div>
  );
};
