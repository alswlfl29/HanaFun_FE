import { FC, ReactNode } from 'react';

interface IProps {
  title: string;
  children: ReactNode;
}

export const AddLessonInputLabel: FC<IProps> = ({ title, children }) => {
  return (
    <div className='mb-5 px-5'>
      <h1 className='font-hanaBold text-lg flex items-end mb-1'>
        {title}
        {title === '사진' && (
          <span className='font-hanaLight text-xs ml-1.5 mb-0.5'>
            대표 이미지를 등록해주세요.
          </span>
        )}
      </h1>
      {children}
    </div>
  );
};
