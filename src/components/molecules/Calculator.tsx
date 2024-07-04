import { useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import Keypad from '../common/Keypad';
import { EditPrice } from './EditPrice';

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('ko-KR').format(value);
};

export const Calculator = () => {
  const currentMonth = new Date().getMonth() + 1;
  const [month, setMonth] = useState(6);

  const [editPriceVisible, setEditPriceVisible] = useState(false);
  const [keypadVisible, setKeypadVisible] = useState(false);
  const [valueSetter, setValueSetter] = useState<
    ((value: string) => void) | null
  >(null);

  const [totalSales, setTotalSales] = useState(762000);
  const [totalPrice, setTotalPrice] = useState(250000);
  const [materialPrice, setMaterialPrice] = useState(100000);
  const [rentalPrice, setRentalPrice] = useState(100000);
  const [etcPrice, setEtcPrice] = useState(50000);
  const netProfit = totalSales - totalPrice;

  const handlePreviousMonth = () => {
    setMonth((prevMonth) => (prevMonth > 1 ? prevMonth - 1 : 1));
  };

  const handleNextMonth = () => {
    if (month < currentMonth) {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };

  const openEditPrice = () => {
    setEditPriceVisible(true);
    setKeypadVisible(true);
  };

  const closeEditPrice = () => {
    setEditPriceVisible(false);
    setKeypadVisible(false);
  };

  const saveEditPrice = (material: string, rental: string, etc: string) => {
    setMaterialPrice(Number(material));
    setRentalPrice(Number(rental));
    setEtcPrice(Number(etc));
    setTotalPrice(Number(material) + Number(rental) + Number(etc));
  };

  return (
    <div className='w-[351px] h-[338px] p-6 bg-white font-hanaMedium rounded-xl border-[1px] border-hanaSilver'>
      <div className='flex flex-row justify-center items-center'>
        <GrFormPrevious
          className='mt-1 mr-24 cursor-pointer'
          onClick={handlePreviousMonth}
        />
        <p>{month}월 매출액</p>
        <GrFormNext
          className='mt-1 ml-24 cursor-pointer'
          onClick={handleNextMonth}
        />
      </div>

      <div className='flex justify-between mt-10 text-xl'>
        <p>매출액</p>
        <p>{formatNumber(totalSales)}원</p>
      </div>

      <div className='flex justify-between mt-4 text-xl'>
        <div className='flex flex-row'>
          <p>지출액</p>
          <BsPencil
            className='text-hanaSilver pt-1 pl-2 w-6 h-6 cursor-pointer'
            onClick={openEditPrice}
          />
        </div>
        <p>{formatNumber(totalPrice)}원</p>
      </div>

      <div className='text-[12px] text-hanaSilver mt-3'>
        <div className='flex justify-between'>
          <p>재료비</p>
          <p>{formatNumber(materialPrice)}원</p>
        </div>
        <div className='flex justify-between mt-2'>
          <p>장소대여비</p>
          <p>{formatNumber(rentalPrice)}원</p>
        </div>
        <div className='flex justify-between mt-2'>
          <p>기타비용</p>
          <p>{formatNumber(etcPrice)}원</p>
        </div>
      </div>
      <div className='mt-5 pt-4 text-xl flex justify-between border-t-[1px] border-hanaSilver'>
        <p>순수익</p>
        <p className='font-hanaMedium text-hanaGreen'>
          {formatNumber(netProfit)}원
        </p>
      </div>
      {editPriceVisible && (
        <EditPrice
          closeEditPrice={closeEditPrice}
          saveEditPrice={saveEditPrice}
          setValue={setValueSetter}
        />
      )}
      {/* {keypadVisible && (
        <Keypad
          setValue={(value) => valueSetter && valueSetter(value)}
          closeKeypad={() => setKeypadVisible(false)}
        />
      )} */}
    </div>
  );
};
