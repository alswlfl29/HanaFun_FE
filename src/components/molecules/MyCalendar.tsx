import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import '../css/MyCalendar.css';
import moment from 'moment';

interface IProps {
  data: CalendarDataType[] | undefined;
  setSelectedLesson: (lesson: CalendarDataType[]) => void;
  onDateChange: (date: Date) => void;
  onSelectLessondateId: (lessondateId: number) => void;
  check: (date: Date) => void;
}

export const MyCalendar = ({
  data,
  setSelectedLesson,
  onDateChange,
  onSelectLessondateId,
  check,
}: IProps) => {
  const [value, setValue] = useState(new Date());
  const [mark, setMark] = useState<string[]>([]);

  const handleDateChange = (date: Date | Date[]) => {
    const selectedDate = Array.isArray(date) ? date[0] : date;
    check(value);
    setValue(selectedDate);
    onDateChange(selectedDate);
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    if (data) {
      const lessons = data.filter((lesson) => lesson.date === formattedDate);
      if (lessons.length > 0) {
        onSelectLessondateId(lessons[0].lessondateId); // 선택한 날짜의 lessondateId 전달
      }
      setSelectedLesson(lessons);
    }
  };

  useEffect(() => {
    if (data) {
      const dates = data.map((lesson) => lesson.date);
      setMark(dates);
    }
  }, [data]);

  const handleOpenList = () => {
    console.log(value);
  };

  useEffect(() => {
    onDateChange(new Date());
  }, [onDateChange]);

  return (
    <div className='flex flex-col items-center justify-center font-hanaRegular'>
      <Calendar
        className='mt-3 p-5 h-[336px] text-center font-hanaRegular bg-white rounded-2xl border-[1px] border-hanaSilver'
        formatDay={(locale, date) => moment(date).format('D')}
        locale='ko'
        next2Label={null}
        prev2Label={null}
        onChange={handleDateChange}
        showNeighboringMonth={false}
        value={value}
        calendarType='gregory'
        onClickDay={handleOpenList}
        tileContent={({ date, view }) => {
          let html = [];
          if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
            html.push(
              <div key={moment(date).format('YYYY-MM-DD')}>
                <img src='/images/mypage/dot.png' alt='' className='w-2 h-2' />
              </div>
            );
          }
          return (
            <div className='flex justify-center items-center absoluteDiv'>
              {html}
            </div>
          );
        }}
      />
    </div>
  );
};
