import { useEffect, useState } from 'react';

export const useTimer = (initialTime: number = 60 * 1000) => {
  const [time, setTime] = useState<number>(initialTime);
  const minute = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, '0');
  const second = String(Math.floor((time / 1000) % 60)).padStart(2, '0');

  const resetTimer = () => {
    setTime(initialTime);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1000);
    }, 1000);

    if (time <= 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [time]);

  return [minute, second, resetTimer] as const;
};
