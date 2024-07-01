import { useState } from 'react';
import { CgClose } from 'react-icons/cg';

interface IProps {
  closeEditPrice: () => void;
  saveEditPrice: (
    materialPrice: string,
    rentalPrice: string,
    etcPrice: string
  ) => void;
  setValue: (setter: (value: string) => void) => void;
}

const formatNumber = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const unformatNumber = (value: string) => {
  return value.replace(/,/g, '');
};

export const EditPrice = ({
  closeEditPrice,
  saveEditPrice,
  setValue,
}: IProps) => {
  const [materialPrice, setMaterialPrice] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [etcPrice, setEtcPrice] = useState('');

  const handleSave = () => {
    saveEditPrice(
      unformatNumber(materialPrice),
      unformatNumber(rentalPrice),
      unformatNumber(etcPrice)
    );
    closeEditPrice();
  };

  const handleChange =
    (setter: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (/^\d*\.?\d*$/.test(unformatNumber(value))) {
        setter(formatNumber(unformatNumber(value)));
      }
    };

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative bg-white w-[277px] h-[279px] rounded-lg text-center p-5'>
        <CgClose
          className='absolute top-3 right-3 text-hanaSilver cursor-pointer'
          onClick={closeEditPrice}
        />
        <p className='text-hanaNavGreen'>지출액 수정</p>
        <div className='mt-9 font-hanaRegular'>
          <div className='flex justify-between'>
            <p>재료비</p>
            <span>
              <input
                type='text'
                className='border-b-[1px] border-hanaSilver w-24 text-right'
                value={materialPrice}
                onChange={handleChange(setMaterialPrice)}
                onFocus={() => setValue(setMaterialPrice)}
              />{' '}
              원
            </span>
          </div>
          <div className='flex justify-between mt-5'>
            <p>장소대여비</p>
            <span>
              <input
                type='text'
                className='border-b-[1px] border-hanaSilver w-24 text-right'
                value={rentalPrice}
                onChange={handleChange(setRentalPrice)}
                onFocus={() => setValue(setRentalPrice)}
              />{' '}
              원
            </span>
          </div>
          <div className='flex justify-between mt-5 '>
            <p>기타비용</p>
            <span>
              <input
                type='text'
                className='border-b-[1px] border-hanaSilver w-24 text-right'
                value={etcPrice}
                onChange={handleChange(setEtcPrice)}
                onFocus={() => setValue(setEtcPrice)}
              />{' '}
              원
            </span>
          </div>
        </div>
        <div className='flex flex-row justify-center mt-5'>
          <button
            type='button'
            className='w-[84px] h-[44px] mr-3 bg-hanaSilver text-xl font-hanaMedium rounded-xl text-white'
            onClick={closeEditPrice}
          >
            취소
          </button>
          <button
            type='button'
            className='w-[141px] h-[44px] bg-hanaNavGreen text-xl font-hanaMedium rounded-xl text-white'
            onClick={handleSave}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
