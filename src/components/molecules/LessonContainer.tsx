import { FC, ReactNode } from 'react';

interface IProps {
  title: string;
  children: ReactNode;
}

export const LessonContainer: FC<IProps> = ({ title, children }) => {
  return (
    <div className='relative w-full bg-white p-4 mt-5'>
      <h1 className='font-hanaBold text-xl mb-4'>{title}</h1>
      {children}
    </div>
  );
};
