import { FC } from 'react';

interface IProps {
  id: number;
  name: string;
  bgColor: string;
  textColor: string;
  onClick: (categoryId: number) => void;
}

export const CategoryItem: FC<IProps> = ({
  id,
  name,
  bgColor,
  textColor,
  onClick,
}) => {
  return (
    <button
      className={`h-8 py-1.5 px-3 bg-[${bgColor}] font-hanaMedium text-sm rounded-2xl text-${textColor}`}
      onClick={() => onClick(id)}
    >
      {name}
    </button>
  );
};
