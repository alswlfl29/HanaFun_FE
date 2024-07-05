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
      <div className='w-36 h-36 rounded-xl overflow-hidden'>
        <img
          src={img}
          alt='클래스 사진'
          className='w-full h-full object-cover'
        />
      </div>
      <p className='font-hanaMedium text-sm overflow-hidden whitespace-nowrap text-ellipsis break-all'>
        {title}
      </p>
    </div>
  );
};
