import { useState, useEffect } from 'react';
import { CgClose } from 'react-icons/cg';

interface IProps {
  closeEditPrice: () => void;
  saveEditPrice: () => void;
  initialMaterialPrice: number;
  initialRentalPrice: number;
  initialEtcPrice: number;
  setMaterialPrice: (materialPrice: number) => void;
  setRentalPrice: (rentalPrice: number) => void;
  setEtcPrice: (etcPrice: number) => void;
}

const formatNumber = (value: number) => {
  return value.toLocaleString('ko-KR');
};

export const EditPrice = ({
  closeEditPrice,
  saveEditPrice,
  initialMaterialPrice,
  initialRentalPrice,
  initialEtcPrice,
  setMaterialPrice,
  setRentalPrice,
  setEtcPrice,
}: IProps) => {
  const [materialPrice, setInputMaterialPrice] = useState<number>(0);
  const [rentalPrice, setInputRentalPrice] = useState<number>(0);
  const [etcPrice, setInputEtcPrice] = useState<number>(0);

  useEffect(() => {
    setInputMaterialPrice(initialMaterialPrice);
    setInputRentalPrice(initialRentalPrice);
    setInputEtcPrice(initialEtcPrice);
  }, [initialMaterialPrice, initialRentalPrice, initialEtcPrice]);

  const handleSave = () => {
    setMaterialPrice(materialPrice);
    setRentalPrice(rentalPrice);
    setEtcPrice(etcPrice);
    saveEditPrice();
    closeEditPrice();
  };

  const unformatNumber = (value: string) => {
    return value.replace(/,/g, '');
  };

  const handleChange =
    (setter: (value: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (/^\d*\.?\d*$/.test(unformatNumber(value))) {
        setter(Number(unformatNumber(value)));
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
                value={formatNumber(materialPrice)}
                onChange={handleChange(setInputMaterialPrice)}
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
                value={formatNumber(rentalPrice)}
                onChange={handleChange(setInputRentalPrice)}
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
                value={formatNumber(etcPrice)}
                onChange={handleChange(setInputEtcPrice)}
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
