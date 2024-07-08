import { useEffect, useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { EditPrice } from './EditPrice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
interface IProps {
  data: any;
  lessonId: number;
  year: number;
}

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('ko-KR').format(value);
};

export const Calculator = ({ data, lessonId, year }: IProps) => {
  const currentMonth = new Date().getMonth() + 1;
  const [month, setMonth] = useState(currentMonth);
  const [editPriceVisible, setEditPriceVisible] = useState(false);

  const [totalSales, setTotalSales] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [materialPrice, setMaterialPrice] = useState(0);
  const [rentalPrice, setRentalPrice] = useState(0);
  const [etcPrice, setEtcPrice] = useState(0);
  const netProfit = totalSales - totalPrice;

  useEffect(() => {
    const currentMonthData = data.find((d: any) => d.month === month);
    if (currentMonthData) {
      setTotalSales(currentMonthData.totalRevenue);
      setMaterialPrice(currentMonthData.materialPrice);
      setRentalPrice(currentMonthData.rentalPrice);
      setEtcPrice(currentMonthData.etcPrice);
      setTotalPrice(currentMonthData.totalSales);
    }
  }, [month, data]);

  const handlePreviousMonth = () => {
    setMonth((prevMonth) => (prevMonth > 1 ? prevMonth - 1 : 1));
  };

  const handleNextMonth = () => {
    if (month < 12) {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };

  const openEditPrice = () => {
    setEditPriceVisible(true);
  };

  const closeEditPrice = () => {
    setEditPriceVisible(false);
  };

  const reqData: PriceReqType = {
    lessonId: lessonId,
    year: year,
    month: month,
    materialPrice: materialPrice,
    rentalPrice: rentalPrice,
    etcPrice: etcPrice,
  };
  const queryClient = useQueryClient();
  const { mutate: updatePrice } = useMutation({
    mutationFn: async () => {
      const response = await ApiClient.getInstance().updatePrice(reqData);
      return response;
    },
    onSuccess: async (response) => {
      if (response.data) {
        setMaterialPrice(response.data.materialPrice);
        setRentalPrice(response.data.rentalPrice);
        setEtcPrice(response.data.etcPrice);
        setTotalPrice(
          response.data.materialPrice +
            response.data.rentalPrice +
            response.data.etcPrice
        );
        queryClient.invalidateQueries({ queryKey: ['monthRevenue'] });
      }
    },
    onError: async () => {},
  });

  const saveEditPrice = () => {
    updatePrice();
  };

  return (
    <div className='w-[351px] h-[338px] p-6 bg-white font-hanaMedium rounded-xl border-[1px] border-hanaSilver'>
      <div className='flex flex-row justify-center items-center'>
        <GrFormPrevious
          className='mt-1 mr-[90px] cursor-pointer'
          onClick={handlePreviousMonth}
        />
        <p>{month}월 매출액</p>
        <GrFormNext
          className='mt-1 ml-[90px] cursor-pointer'
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
          initialMaterialPrice={materialPrice}
          initialRentalPrice={rentalPrice}
          initialEtcPrice={etcPrice}
          setMaterialPrice={setMaterialPrice}
          setRentalPrice={setRentalPrice}
          setEtcPrice={setEtcPrice}
        />
      )}
    </div>
  );
};
