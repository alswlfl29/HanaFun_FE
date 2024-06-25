import { FC } from 'react';

interface IProps {
  message: string;
  onClick: () => void;
}

export const Button: FC<IProps> = ({ message, onClick }) => {
  return (
    <div className='absolute w-full flex justify-center bottom-6'>
      <button
        className='w-[90%] bg-hanaNavGreen rounded-2xl py-4 text-xl font-hanaBold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]'
        onClick={onClick}
      >
        {message}
      </button>
    </div>
  );
};
