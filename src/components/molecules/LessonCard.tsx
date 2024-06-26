interface IProps {
  image: string;
  title: string;
  category: string;
  date: string;
}

export const LessonCard = ({ image, title, category, date }: IProps) => {
  return (
    <div className='w-[108px] h-[156px] px-4 pt-5 mr-[15px] bg-white font-hanaRegular rounded-2xl shadow-md'>
      <img src={image} alt='cardImg' className='w-20 h-20' />
      <p className='text-xs mt-1'>{title}</p>
      <div className='flex justify-between mt-4 text-[6px]'>
        <p># {category}</p>
        <p>{date}</p>
      </div>
    </div>
  );
};
