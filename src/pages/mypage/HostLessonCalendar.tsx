import { useNavigate, useParams } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { MyCalendar } from '../../components/molecules/MyCalendar';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { LessonDetail } from '../../components/molecules/LessonDetail';
import { ApplicantList } from '../../components/organisms/ApplicantList';

export const HostLessonCalendar = () => {
  const navigate = useNavigate();
  const { lesson_id } = useParams<{ lesson_id: string }>();
  const [selectedLesson, setSelectedLesson] = useState<HostLessonDetailType[]>(
    []
  );
  const [calendarData, setCalendarData] = useState<CalendarDataType[]>([]);
  const [applicants, setApplicants] = useState<PeopleListType | null>(null);
  const currDate = new Date();
  const currYear = Number(currDate.getFullYear());
  const currMonth = Number(currDate.getMonth());
  const [year, setYear] = useState(currYear);
  const [month, setMonth] = useState(currMonth);

  // 개설 클래스 일정 api
  const { data: hostLessonDetail } = useQuery({
    queryKey: ['hostLessonDetail', lesson_id],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getHostLessonDetailList(
        Number(lesson_id)
      );
      return response;
    },
  });

  // 클래스 상세 api
  const { data: lessonDetail } = useQuery({
    queryKey: ['lessonDetail', lesson_id],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getLessonDetail(
        Number(lesson_id)
      );
      return response;
    },
  });

  useEffect(() => {
    if (hostLessonDetail?.data) {
      const formattedData = hostLessonDetail.data.map(
        (lesson: HostLessonDetailType) => ({
          lesson_id: lesson.lessonId,
          lessondateId: lesson.lessondateId,
          date: lesson.date,
        })
      );
      setCalendarData(formattedData);
    }
  }, [hostLessonDetail]);

  const handleLessonDetail = async (lessondateId: number) => {
    try {
      const response = await ApiClient.getInstance().peopleList({
        lessondateId: lessondateId,
      });
      if (response && response.data) {
        setApplicants(response.data);
      } else {
        setApplicants(null);
      }
    } catch (error) {
      console.error('예약자 정보를 가져오는 데 실패했습니다.', error);
      setApplicants(null);
    }
  };
  const handleDateChange = (date: Date) => {
    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1);
  };
  const handleSelectLessondateId = (lessondateId: number) => {
    handleLessonDetail(lessondateId);
  };

  return (
    <div>
      <Topbar
        title={lessonDetail ? lessonDetail.data?.title : '클래스명'}
        onClick={() => navigate('/mypage/host')}
      />
      <MyCalendar
        data={calendarData}
        setSelectedLesson={(lessons: CalendarDataType[]) => {
          const selectedLessons = hostLessonDetail?.data?.filter(
            (lesson: HostLessonDetailType) =>
              lessons.some(
                (selectedLesson) => selectedLesson.lesson_id === lesson.lessonId
              )
          );
          setSelectedLesson(selectedLessons || []);
        }}
        onDateChange={handleDateChange}
        onSelectLessondateId={handleSelectLessondateId}
        check={() => {}}
      />
      <div className='m-5'>
        <ApplicantList applicants={applicants} />
        <p className='font-hanaMedium text-xl mt-5 ml-1'>클래스 상세 정보</p>
        <LessonDetail lessonDetail={lessonDetail} />
      </div>
    </div>
  );
};
