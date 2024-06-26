import { FC } from 'react';
import { IconType } from 'react-icons';

interface IProps {
  Icon: IconType;
  title: string;
  desc: string;
  image: string;
}

export const InfoCard: FC<IProps> = ({ Icon, title, desc, image }) => {
  return (
    <div className='w-full h-56 flex flex-col justify-center items-center bg-hanaNavGreen py-5 px-8 pb-2 rounded-2xl'>
      <Icon size={26} color='white' />
      <p className='font-hanaBold text-base text-[#EBFF00] mt-2'>{title}</p>
      <p className='font-hanaRegular text-sm text-white mt-2'>{desc}</p>
      <div className='w-full flex justify-end'>
        <img src={image} alt='image' className='w-30' />
      </div>
    </div>
  );
};
