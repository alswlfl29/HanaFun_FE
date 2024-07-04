import { useNavigate } from 'react-router-dom';

interface Iprops {
  lesson_id: number;
  title: string;
  lessonTotal: number;
  year: number;
}

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('ko-KR').format(value);
};

export const LessonSalesTotal = ({
  lesson_id,
  title,
  lessonTotal,
  year,
}: Iprops) => {
  const navigate = useNavigate();
  return (
    <div
      className='flex justify-between mb-3 border-b-[2px] px-3 py-1 border-hanaSilver font-hanaMedium text-[18px] cursor-pointer'
      onClick={() =>
        navigate(`/mypage/host/sales/sales-year/${year}/${lesson_id}`)
      }
    >
      <p>{title}</p>
      <p>{formatNumber(lessonTotal)} 원</p>
    </div>
  );
};
