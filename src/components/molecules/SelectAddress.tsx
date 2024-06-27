import { FC, useRef, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { ModalBottomContainer } from '../organisms/ModalBottomContainer';

interface IProps {
  onChangeAddress: (address: string) => void;
}

export const SelectAddress: FC<IProps> = ({ onChangeAddress }) => {
  const [openAddressPopup, setOpenAddressPopup] = useState<boolean>(false);
  const [zonecode, setZonecode] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const detailInputRef = useRef<HTMLInputElement | null>(null);

  const themeObj = {
    bgColor: '#FFFFFF',
    pageBgColor: '#FFFFFF',
    postcodeTextColor: '#C05850',
    emphTextColor: '#222222',
  };

  const postCodeStyle = {
    width: '360px',
    height: '480px',
    marginTop: '25px',
  };

  const handleOpenAddressPopup = () => {
    setOpenAddressPopup((prev) => !prev);
  };

  const completeHanlder = (data: { address: string; zonecode: string }) => {
    const { address, zonecode } = data;
    setZonecode(zonecode);
    setAddress(address);
    onChangeAddress(address);
  };

  const closeHandler = (state: string) => {
    if (state === 'FORCE_CLOSE') setOpenAddressPopup(false);
    else if (state === 'COMPLETE_CLOSE') setOpenAddressPopup(false);
  };

  const handleInputDetailAddress = () => {
    if (detailInputRef.current) {
      onChangeAddress(address + ' ' + detailInputRef.current.value);
    }
  };

  return (
    <>
      {openAddressPopup && (
        <ModalBottomContainer color='#FFFFFF' onClose={handleOpenAddressPopup}>
          <DaumPostcode
            theme={themeObj}
            style={postCodeStyle}
            onComplete={completeHanlder}
            onClose={closeHandler}
          />
        </ModalBottomContainer>
      )}
      <div className='mb-5'>
        <h1 className='font-hanaBold text-lg flex items-end mb-1'>장소</h1>
        <div className='flex flex-col gap-2'>
          <p className='flex items-center gap-2'>
            <input
              type='text'
              value={zonecode}
              disabled
              className='rounded border-[0.7px] bg-white border-hanaSilver text-xs p-2 focus:outline-none'
            />
            <button
              onClick={handleOpenAddressPopup}
              className='rounded border-[1px] border-hanaGreen font-hanaRegular p-2 text-hanaGreen text-xs hover:text-white hover:bg-hanaGreen'
            >
              주소검색
            </button>
          </p>
          <input
            type='text'
            value={address}
            disabled
            className='rounded border-[0.7px] border-hanaSilver text-xs p-2 focus:outline-none'
          />
          <input
            type='text'
            ref={detailInputRef}
            placeholder='상세주소를 입력해주세요'
            onBlur={handleInputDetailAddress}
            className='rounded border-[0.7px] bg-white border-hanaSilver text-xs p-2 focus:outline-none'
          />
        </div>
      </div>
    </>
  );
};
