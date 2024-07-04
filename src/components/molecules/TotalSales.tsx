interface IProps {
  data: TotalType | undefined;
}

export const TotalSales = ({ data }: IProps) => {
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('ko-KR').format(value);
  };

  const totalRevenue = data?.totalRevenue ?? 0;

  return (
    <div className='w-[351px] h-[107px] mt-5 bg-white rounded-lg shadow-md border-[1px] text-center flex flex-col justify-center items-center font-hanaMedium'>
      <p>전체 매출액</p>
      <p className='text-xl mt-3'>
        <span className='text-hanaRed'>{formatNumber(totalRevenue)}</span> 원
      </p>
    </div>
  );
};
