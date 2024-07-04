import { FC, ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';

interface IProps {
  children: ReactNode;
  color: string;
  onClose: () => void;
}

export const ModalBottomContainer: FC<IProps> = ({
  children,
  color,
  onClose,
}) => {
  return (
    <>
      <div
        className='absolute bg-black/50 top-0 left-0 flex flex-col w-full h-full justify-center items-center z-[60]'
        onClick={() => onClose()}
      ></div>
      <div
        className={`fixed max-w-[390px] w-full h-auto flex flex-col justify-center items-center bg-[${color}] rounded-t-2xl pt-5 bottom-0 z-[70] gap-3`}
      >
        <IoMdClose
          size={25}
          color='#B5B5B5'
          className='absolute top-0 right-0 mr-5 mt-5 cursor-pointer'
          onClick={() => onClose()}
        />
        {children}
      </div>
    </>
  );
};
