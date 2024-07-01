import QRCode from 'qrcode.react';
import { FC, useState } from 'react';
import { QRScanner } from './QRScanner';
import { ModalBottomContainer } from '../organisms/ModalBottomContainer';

interface IProps {
  userId: number;
  accountId: number;
  accountNumber: string;
  balance: number;
  onClose: () => void;
}

export const QR: FC<IProps> = ({
  userId,
  accountId,
  accountNumber,
  balance,
  onClose,
}) => {
  console.log(userId, accountId, accountNumber, balance);
  const [isScan, setIsScan] = useState(false);

  return (
    <ModalBottomContainer onClose={onClose} color='#FFFFFF'>
      <div
        className='mt-12 mb-8 bg-[#D9D9D9] w-52 rounded-[2rem] px-2 py-1 flex justify-center items-center gap-2'
        onClick={() => setIsScan(!isScan)}
      >
        <p
          className={`h-10 w-1/2 rounded-[2rem] flex justify-center items-center text-sm font-hanaBold transition-all duration-200 ease-in ${isScan ? 'text-black/50 bg-transparent' : 'text-black bg-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]'}`}
        >
          QR코드
        </p>
        <p
          className={`h-10 w-1/2 rounded-[2rem] flex justify-center items-center text-sm font-hanaBold transition-all duration-200 ease-in ${isScan ? 'text-black bg-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]' : 'text-black/50 bg-transparent'}`}
        >
          QR스캔
        </p>
      </div>
      {isScan ? (
        <QRScanner onClose={() => setIsScan(false)} />
      ) : (
        <div className='w-80 h-80 border-2 border-hanaSilver rounded-3xl overflow-hidden flex justify-center items-center mb-20'>
          <QRCode
            value={JSON.stringify({
              userId,
              accountId,
              accountNumber,
              balance,
            })}
            size={220}
          />
        </div>
      )}
    </ModalBottomContainer>
  );
};
