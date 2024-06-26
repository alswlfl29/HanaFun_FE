import QRCode from 'qrcode.react';
import { FC, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { QRScanner } from './QRScanner';

interface IProps {
  userId: number;
  accountId: number;
  accountNumber: string;
  onClose: () => void;
}

export const QR: FC<IProps> = ({
  userId,
  accountId,
  accountNumber,
  onClose,
}) => {
  console.log(userId, accountId, accountNumber);
  const [isScan, setIsScan] = useState(false);

  return (
    <>
      <div
        className='absolute bg-black/50 top-0 left-0 flex flex-col w-full h-full justify-center items-center z-[60]'
        onClick={() => onClose()}
      ></div>
      <div className='absolute w-full flex flex-col items-center bg-white rounded-t-2xl bottom-0 left-0 z-[70] pt-5'>
        <IoMdClose
          size={25}
          color='#B5B5B5'
          className='cursor-pointer absolute right-5'
          onClick={() => onClose()}
        />
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
              })}
              size={220}
            />
          </div>
        )}
      </div>
    </>
  );
};
