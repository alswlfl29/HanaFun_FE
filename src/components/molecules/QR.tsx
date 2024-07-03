import QRCode from 'qrcode.react';
import { FC, useEffect, useState } from 'react';
import { ModalBottomContainer } from '../organisms/ModalBottomContainer';
import { useTimer } from '../../hooks/useTimer';
import { VscDebugRestart } from 'react-icons/vsc';

interface IProps {
  accountId: number;

  balance: number;
  onClose: () => void;
}

export const QR: FC<IProps> = ({
  accountId,

  balance,
  onClose,
}) => {
  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const [qrValue, setQrValue] = useState<string>('');
  const [minute, second, resetTimer] = useTimer();

  useEffect(() => {
    setQrValue(
      JSON.stringify({
        accountId,

        balance,
      })
    );
  }, [accountId, balance]);

  const handleReset = () => {
    setQrValue(
      JSON.stringify({
        accountId,
        balance,
      })
    );
    resetTimer();
    setIsTimeout(false);
  };

  useEffect(() => {
    if (minute === '00' && second === '00') setIsTimeout(true);
  }, [minute, second]);

  return (
    <ModalBottomContainer onClose={onClose} color='#FFFFFF'>
      <div className='relative flex flex-col w-80 h-80 justify-between items-center mt-16 mb-12'>
        <div className='w-72 h-72 flex justify-center items-center rounded-lg border border-hanaSilver p-8'>
          <QRCode
            value={qrValue}
            size={220}
            fgColor={!isTimeout ? 'black' : 'gray'}
          />
        </div>
        {isTimeout && (
          <button
            className='absolute mt-32 flex justify-center items-center gap-2 bg-hanaGreen w-10/12 rounded-2xl text-white font-hanaMedium py-1.5'
            onClick={handleReset}
          >
            QR 다시 생성하기
            <VscDebugRestart size={18} />
          </button>
        )}
        <div className='flex justify-center items-center font-hanaRegular text-lg mt-5'>
          {minute}:{second}
          <p
            className='absolute right-5 rounded-full border border-hanaSilver p-1 cursor-pointer'
            onClick={handleReset}
          >
            <VscDebugRestart size={18} />
          </p>
        </div>
      </div>
    </ModalBottomContainer>
  );
};
