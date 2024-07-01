import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';

export const formatDate = (
  date: string,
  startTime: string,
  endTime: string
): string => {
  return (
    format(new Date(date), 'MM월 dd일 (EEE)', {
      locale: ko,
    }) +
    '  ' +
    format(new Date(startTime), 'p', { locale: ko }) +
    ' ~ ' +
    format(new Date(endTime), 'p', { locale: ko })
  );
};
