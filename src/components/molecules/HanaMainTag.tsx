import { FC } from 'react';

interface IProps {
  icon: string;
  name: string;
}

export const HanaMainTag: FC<IProps> = ({ icon, name }) => {
  return (
    <div className='flex items-center h-8 bg-[#EFF0F4] font-hanaMedium text-sm px-2 py-2 rounded-lg gap-1'>
      <img src={icon} alt={name} className='w-4' />
      {name}
    </div>
  );
};
