import QrScanner from 'qr-scanner';
import { FC, useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface IProps {
  onClose: () => void;
}

export type qrUserInfo = {
  accountId: number;
  balance: number;
};

export const QRScanner: FC<IProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner>();
  const qrBox = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  const QrOptions = {
    // 핸드폰의 경우, 외부 카메라인지 셀프카메라인지
    preferredCamera: 'environment',
    // 1초당 몇번의 스캔을 할 것인지? ex) 1초에 5번 QR 코드 감지한다.
    maxScansPerSecond: 5,
    // QR 스캔이 일어나는 부분을 표시해줄 지 (노란색 네모 테두리가 생긴다.)
    highlightScanRegion: true,
  };

  const handleScan = (result: QrScanner.ScanResult) => {
    const parsedData: qrUserInfo = JSON.parse(result.data);

    navigate('/qr-pay', {
      state: {
        accountId: parsedData.accountId,
        balance: parsedData.balance,
      },
    });
  };

  useEffect(() => {
    if (videoRef.current && !qrScannerRef.current) {
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => handleScan(result),
        QrOptions
      );
    }

    qrScannerRef.current
      ?.start()
      .then(() => setQrOn(true))
      .catch((err) => {
        if (err) setQrOn(false);
      });

    return () => {
      if (!videoRef?.current) qrScannerRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    if (!qrOn) alert('카메라 접근 허용을 해주세요.');
  }, [qrOn]);

  return (
    <div className='relative top-0 left-0 flex flex-col w-full h-full justify-center items-center z-[60] overflow-hidden bg-black'>
      <IoMdClose
        size={30}
        color='white'
        className='cursor-pointer absolute top-8 right-8 z-[10]'
        onClick={() => onClose()}
      />
      <h1 className='absolute top-20 z-[10] text-white font-hanaMedium text-xl'>
        QR코드를 스캔해 주세요.
      </h1>
      <video className='w-full h-screen object-cover' ref={videoRef}></video>
      <div
        className='absolute inset-0 border-y-[250px] border-x-[50px] border-black/70'
        ref={qrBox}
      ></div>
    </div>
  );
};
