import { FC } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

interface IProps {
  title: string;
  onClick: () => void;
}

export const Topbar: FC<IProps> = ({ title, onClick }) => {
  return (
    <div className='flex items-center bg-white w-full py-4'>
      <IoIosArrowBack
        size={22}
        className='ml-4 cursor-pointer'
        onClick={onClick}
      />
      <span className='text-base font-hanaMedium m-auto pr-10'>{title}</span>
    </div>
  );
};
