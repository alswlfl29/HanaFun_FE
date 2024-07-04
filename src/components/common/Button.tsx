import { FC } from 'react';
import { useLocation } from 'react-router-dom';

interface IProps {
  message: string;
  isActive: boolean;
  onClick: () => void;
}

export const Button: FC<IProps> = ({ message, isActive, onClick }) => {
  const location = useLocation();

  return (
    <div
      className={`${location.pathname === '/open-lesson' ? 'w-[390px]' : 'absolute w-full flex justify-center bottom-6'}`}
    >
      <button
        disabled={!isActive}
        className={`w-[90%] rounded-2xl py-4 text-xl font-hanaBold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)] ${isActive ? 'bg-hanaNavGreen' : 'bg-hanaNavGreen/50'}`}
        onClick={onClick}
      >
        {message}
      </button>
    </div>
  );
};
