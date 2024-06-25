import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { FiDelete } from 'react-icons/fi';
import clsx from 'clsx';

const Keypad = () => {
  const [isVisible, setIsVisible] = useState(true);
  //   const [inputValue, setInputValue] = useState('');
  const [clickedButtons, setClickedButtons] = useState<number[]>([]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleButtonClick = (value: number) => {
    // setInputValue((prev) => prev + value.toString());
    setClickedButtons((prev) => [...prev, value]);

    setTimeout(() => {
      setClickedButtons((prev) => prev.filter((v) => v !== value));
    }, 150);
  };

  const handleDelete = () => {
    // setInputValue((prev) => prev.slice(0, -1));
    setClickedButtons((prev) => [...prev, -1]);

    setTimeout(() => {
      setClickedButtons((prev) => prev.filter((v) => v !== -1));
    }, 150);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className='fixed bottom-0 w-[390px] h-[303px] bg-[#373A4D] py-6 rounded-t-2xl text-white text-2xl font-hanaBold'>
      <CgClose className='w-5 h-5 ml-7 cursor-pointer' onClick={handleClose} />
      {/* <input
        type='text'
        readOnly
        value={inputValue}
        className='w-full mb-5 p-2 text-black rounded-lg'
      /> */}
      <div className='grid grid-cols-3'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0, -2].map((num) => {
          if (num === -1) {
            return (
              <button
                key={num}
                type='button'
                onClick={handleDelete}
                className='flex items-center justify-center'
              >
                <FiDelete />
              </button>
            );
          } else if (num === -2) {
            return (
              <button
                key={num}
                type='button'
                className='p-4 rounded-lg bg-[#373A4D] text-white font-hanaRegular text-xl'
                onClick={handleClose}
              >
                완료
              </button>
            );
          } else {
            return (
              <button
                key={num}
                type='button'
                onClick={() => handleButtonClick(num)}
                className={clsx(
                  'p-4 rounded-lg',
                  clickedButtons.includes(num)
                    ? 'bg-white text-black'
                    : 'bg-[#373A4D] text-white'
                )}
              >
                {num}
              </button>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Keypad;
