import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { TotalSales } from '../../components/molecules/TotalSales';
import { TotalSalesCard } from '../../components/molecules/TotalSalesCard';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';

// 매출 관리 페이지
export const Sales = () => {
  const navigate = useNavigate();

  const { data: totalRevenue } = useQuery({
    queryKey: ['totalRevenue'],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getTotal();
      return response.data;
    },
  });

  return (
    <div>
      <Topbar title='매출 관리' onClick={() => navigate('/mypage/host')} />
      <p className='font-hanaMedium text-xl mt-5 ml-5'>매출 관리</p>
      <div className='flex flex-col justify-center items-center'>
        <TotalSalesCard />
        <TotalSales data={totalRevenue} />
      </div>
    </div>
  );
};
