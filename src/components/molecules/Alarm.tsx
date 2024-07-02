import { FC, useEffect, useState } from 'react';

interface IProps {
  message: string;
  showAlarm: boolean;
  onClickShowAlarm: (status: boolean) => void;
}

export const Alarm: FC<IProps> = ({ message, showAlarm, onClickShowAlarm }) => {
  const [activeAnimation, setActiveAnimation] = useState<boolean>(true);

  useEffect(() => {
    let timer;
    if (activeAnimation) {
      timer = setTimeout(() => {
        setActiveAnimation(false);
      }, 3000);
    } else {
      timer = setTimeout(() => {
        onClickShowAlarm(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [activeAnimation]);

  return (
    <div
      className={`fixed mx-4 max-w-[351px] w-[90%] py-2 bg-[#D9E8E6] text-black/70 rounded-xl font-hanaMedium text-center  ${activeAnimation ? 'animate-slidedown' : 'animate-slideup'}`}
    >
      {message}
    </div>
  );
};
