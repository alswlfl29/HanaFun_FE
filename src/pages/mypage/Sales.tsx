import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { TotalSales } from '../../components/molecules/TotalSales';
import { TotalSalesCard } from '../../components/molecules/TotalSalesCard';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';

// 매출 관리 페이지
export const Sales = () => {
  const navigate = useNavigate();
  const date = new Date();
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;

  const { data: monthRevenue } = useQuery({
    queryKey: ['monthRevenue'],
    queryFn: async () => {
      const response = await ApiClient.getMonthSales();
      return response;
    },
  });
  console.log(monthRevenue);

  return (
    <div>
      <Topbar title='매출 관리' onClick={() => navigate('/host')} />
      <p className='font-hanaMedium text-xl mt-5 ml-5'>매출 관리</p>
      <div className='flex flex-col justify-center items-center'>
        <TotalSalesCard initYear={year} initMonth={month} data={monthRevenue} />
        <TotalSales />
      </div>
    </div>
  );
};
