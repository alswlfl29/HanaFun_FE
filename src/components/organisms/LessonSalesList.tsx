import { LessonSalesTotal } from '../molecules/LessonSalesTotal';

interface IProps {
  year: number;
  data: MonthSalesType[] | undefined;
}

export const LessonSalesList = ({ year, data }: IProps) => {
  return (
    <div className='h-36 mt-4 px-7 overflow-y-scroll scrollbar-hide'>
      {data?.map((item, index) => (
        <LessonSalesTotal
          key={index}
          lesson_id={item.lesson_id}
          title={item.title}
          lessonTotal={item.revenue}
          year={year}
        />
      ))}
    </div>
  );
};
