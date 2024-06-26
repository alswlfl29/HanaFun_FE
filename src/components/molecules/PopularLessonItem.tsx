import { FC } from 'react';

interface IProps {
  img: string;
  title: string;
}

export const PopularLessonItem: FC<IProps> = ({ img, title }) => {
  return (
    <div className='w-36 flex flex-col justify-center gap-1 cursor-pointer'>
      <div className='w-36 rounded-xl overflow-hidden'>
        <img src={img} alt='클래스 사진' className='w-full' />
      </div>
      <p className='font-hanaRegular text-sm'>{title}</p>
    </div>
  );
};
