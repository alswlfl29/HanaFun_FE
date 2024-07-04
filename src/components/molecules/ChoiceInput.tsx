import { FC } from 'react';
import { FaAngleDown } from 'react-icons/fa';

interface IProps {
  isChoice: boolean;
  content: string;
  openModal: () => void;
}

export const ChoiceInput: FC<IProps> = ({ isChoice, content, openModal }) => {
  return (
    <div
      className={`flex items-center justify-between w-full bg-white rounded border-[0.7px] border-hanaSilver text-xs p-2 cursor-pointer ${isChoice ? 'text-black' : 'text-hanaSilver'}`}
      onClick={openModal}
    >
      {content}
      <FaAngleDown size={16} className='text-black/50' />
    </div>
  );
};
