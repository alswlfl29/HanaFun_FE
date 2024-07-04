import { FC } from 'react';
import { IoBackspaceOutline } from 'react-icons/io5';

interface IProps {
  isLogin: boolean;
  handleChangePw: (num: number) => void;
  handleCancle: () => void;
}

export const PasswordKeypad: FC<IProps> = ({
  isLogin,
  handleChangePw,
  handleCancle,
}) => {
  const clickKeypad = (num: number) => {
    if (num === -1) return;
    handleChangePw(num);
  };
  return (
    <div className='bottom-0 grid grid-cols-4 grid-rows-4 text-white w-full h-60'>
      {[1, -1, 2, -1, 3, 4, 5, 6, 7, 8, 9, 0].map((num, index) => (
        <button
          key={index}
          className='font-hanaBold text-xl flex justify-center items-center hover:bg-white/20 hover:rounded-md'
          onClick={() => clickKeypad(num)}
        >
          {num === -1 ? (
            !isLogin ? (
              <img src='images/hana_logo.svg' alt='hana_logo' className='w-6' />
            ) : undefined
          ) : (
            num
          )}
        </button>
      ))}
      <button
        className='col-end-5 flex justify-center items-center'
        onClick={handleCancle}
      >
        <IoBackspaceOutline size={30} color='#B5B5B5' />
      </button>
    </div>
  );
};
