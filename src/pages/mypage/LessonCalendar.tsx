import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { MyCalendar } from '../../components/molecules/MyCalendar';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { useEffect, useState } from 'react';
import { LessonDetail } from '../../components/molecules/LessonDetail';
import { LessonList } from '../../components/molecules/LessonList';
import { Loading } from '../Loading';
import { ErrorPage } from '../ErrorPage';

export const LessonCalendar = () => {
  const navigate = useNavigate();
  const currDate = new Date();
  const currYear = Number(currDate.getFullYear());
  const currMonth = Number(currDate.getMonth());

  const [selectedLesson, setSelectedLesson] = useState<MyScheduleType[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [calendarData, setCalendarData] = useState<CalendarDataType[]>([]);
  const [year, setYear] = useState(currYear);
  const [month, setMonth] = useState(currMonth);
  const [check, setCheck] = useState<Date>();

  const queryClient = useQueryClient();

  // 나의 신청 클래스 api 호출
  const {
    data: mySchedule,
    isLoading: isLoadingLessons,
    error: errorLessons,
  } = useQuery({
    queryKey: ['mySchedule', year, month],
    queryFn: async () => {
      const reqData = {
        year: year,
        month: month,
      };
      const response = await ApiClient.getInstance().getMySchedule(reqData);
      console.log(response.data);
      return response.data;
    },
  });

  // lesson 상세 정보 api 호출
  const {
    data: selectedLessonDetail,
    isLoading: isLoadingDetail,
    error: errorDetail,
  } = useQuery({
    queryKey: ['lessonDetails', selectedLessonId],
    queryFn: async () => {
      if (selectedLessonId === null) return null;
      const response =
        await ApiClient.getInstance().getLessonDetail(selectedLessonId);
      return response;
    },
    enabled: selectedLessonId !== null,
    retry: 1,
  });

  useEffect(() => {
    if (mySchedule) {
      const formattedData = mySchedule.map((lesson: MyScheduleType) => ({
        lesson_id: lesson.lessonId,
        lessondateId: 0,
        date: lesson.date,
      }));
      setCalendarData(formattedData);
    }
  }, [mySchedule]);

  const handleDateChange = (date: Date) => {
    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1);
  };

  const handleSelectLessondateId = (lessondateId: number) => {};

  useEffect(() => {
    if (check) {
      setSelectedLessonId(null);
      queryClient.invalidateQueries({ queryKey: ['lessonDetails'] });
    }
    console.log('dddd>>', selectedLessonDetail);
  }, [check]);

  if (isLoadingLessons || isLoadingDetail) {
    return <Loading />;
  }

  if (errorLessons || errorDetail) {
    return <ErrorPage />;
  }

  return (
    <div>
      <Topbar title='신청 클래스 일정' onClick={() => navigate('/mypage')} />
      <MyCalendar
        data={calendarData || []}
        setSelectedLesson={(lessons: CalendarDataType[]) => {
          const selectedLessons = mySchedule?.filter((lesson: MyScheduleType) =>
            lessons.some(
              (selectedLesson) => selectedLesson.lesson_id === lesson.lessonId
            )
          );
          setSelectedLesson(selectedLessons || []);
        }}
        onDateChange={handleDateChange}
        onSelectLessondateId={handleSelectLessondateId}
        check={setCheck}
      />
      <div className='m-5'>
        <p className='font-hanaMedium text-xl ml-1'>나의 일정 모아보기</p>
        <LessonList
          selectedLesson={selectedLesson}
          handleLessonDetail={(lessonId: number) =>
            setSelectedLessonId(lessonId)
          }
        />
        <p className='font-hanaMedium text-xl mt-5 ml-1'>클래스 상세 정보</p>
        {isLoadingDetail ? (
          <Loading />
        ) : errorDetail ? (
          <ErrorPage />
        ) : (
          <LessonDetail lessonDetail={selectedLessonDetail} />
        )}
      </div>
    </div>
  );
};

export default LessonCalendar;
