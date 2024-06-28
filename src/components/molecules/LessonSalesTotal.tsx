interface Iprops {
  title: string;
  lessonTotal: number;
}

export const LessonSalesTotal = ({ title, lessonTotal }: Iprops) => {
  return (
    <div className='flex justify-between mb-3 border-b-[2px] px-3 py-1 border-hanaSilver font-hanaMedium text-[18px] cursor-pointer'>
      <p>{title}</p>
      <p>{lessonTotal} 원</p>
    </div>
  );
};
