import { LessonSalesTotal } from '../molecules/LessonSalesTotal';

interface IProps {
  data: MonthSalesType[] | undefined;
}

export const LessonSalesList = ({ data }: IProps) => {
  return (
    <div className='h-36 mt-4 px-7 overflow-y-scroll scrollbar-hide'>
      {data?.map((item, index) => (
        <LessonSalesTotal
          key={index}
          title={item.title}
          lessonTotal={item.revenue}
        />
      ))}
    </div>
  );
};
