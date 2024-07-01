import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  id: number;
  img: string;
  title: string;
}

export const PopularLessonItem: FC<IProps> = ({ id, img, title }) => {
  const navigate = useNavigate();
  return (
    <div
      className='w-36 flex flex-col justify-center gap-1 cursor-pointer'
      onClick={() => navigate(`/lesson/${id}`)}
    >
      <div className='w-36 rounded-xl overflow-hidden'>
        <img src={img} alt='클래스 사진' className='w-full' />
      </div>
      <p className='font-hanaRegular text-sm'>{title}</p>
    </div>
  );
};
