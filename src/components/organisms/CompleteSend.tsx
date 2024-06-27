import { FC } from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';

interface IProps {
  title2: string;
  title1?: string;
}

export const CompleteSend: FC<IProps> = ({ title1, title2 }) => {
  return (
    <div className='absolute flex flex-col justify-center items-center h-[60%] w-full font-hanaBold text-xl'>
      <div className='w-28 h-28 bg-hanaNavGreen rounded-full flex justify-center items-center mb-6'>
        <IoCheckmarkSharp color='white' size={80} />
      </div>
      {title1 && <p className='text-hanaGreen mb-1'>{title1}</p>}
      {title2}
    </div>
  );
};
