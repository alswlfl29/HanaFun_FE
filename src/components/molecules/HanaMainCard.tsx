import { FC } from 'react';
import { IconType } from 'react-icons';
import { LuChevronRight } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

interface IProps {
  id: number;
  Icon: IconType;
  message: string;
  color: string;
}

export const HanaMainCard: FC<IProps> = ({ id, Icon, message, color }) => {
  const navigate = useNavigate();

  return (
    <div
      className='w-32 h-40 flex flex-col bg-white rounded-2xl cursor-pointer py-5 px-3.5 drop-shadow-[1px_3px_4px_rgba(0,0,0,0.1)]'
      onClick={() => {
        id === 2 ? navigate('/login') : undefined;
      }}
    >
      <Icon
        size={id === 2 ? 28 : 32}
        color={color}
        className={id === 3 ? 'origin-center rotate-45' : undefined}
      />
      <p className='whitespace-pre-line font-hanaBold text-sm mt-3'>
        {message}
      </p>
      <p className='flex items-center mt-3'>
        <span className='font-hanaRegular text-xs text-hanaSilver'>
          자세히보기
        </span>
        <LuChevronRight size={15} color='#B5B5B5' />
      </p>
    </div>
  );
};
