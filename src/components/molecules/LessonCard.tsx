import { GoKebabHorizontal } from 'react-icons/go';

interface IProps {
  image: string;
  title: string;
  category: string;
  date: string;
  show: boolean;
  handleClick: () => void;
}

export const LessonCard = ({
  image,
  title,
  category,
  date,
  show,
  handleClick,
}: IProps) => {
  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  return (
    <div className='relative w-[108px] h-[156px] px-4 pt-5 mr-[15px] bg-white font-hanaRegular rounded-2xl shadow-md lesson-card'>
      {show && (
        <GoKebabHorizontal
          className='absolute top-2 right-2 w-3 h-3 text-hanaSilver rotate-90 cursor-pointer'
          onClick={handleClick}
        />
      )}
      <img src={image} alt='cardImg' className='w-20 h-20 relative' />
      <p className='text-xs mt-1'>{truncateTitle(title, 7)}</p>
      <div className='flex justify-between mt-4 text-[6px]'>
        <p># {category}</p>
        <p>{date}</p>
      </div>
    </div>
  );
};
