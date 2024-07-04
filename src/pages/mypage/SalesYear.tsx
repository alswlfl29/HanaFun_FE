import { useNavigate, useParams } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { LineChart } from '../../components/molecules/LineChart';
import { Calculator } from '../../components/molecules/Calculator';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { useMemo } from 'react';

export const SalesYear = () => {
  const { year, lesson_id } = useParams<{ year: string; lesson_id: string }>();
  const navigate = useNavigate();

  // api 호출
  const { data: lessonRevenue } = useQuery({
    queryKey: ['monthRevenue'],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getLessonRevenue(
        Number(year),
        Number(lesson_id)
      );
      return response.data;
    },
  });

  // calculator 데이터 가공
  const calculatorData = useMemo(() => {
    if (!lessonRevenue) return [];

    const monthlyStats = Array.from({ length: 12 }, (_, index) => ({
      month: index + 1,
      totalRevenue: 0,
      totalSales: 0,
      materialPrice: 0,
      rentalPrice: 0,
      etcPrice: 0,
      netProfit: 0,
    }));

    lessonRevenue.forEach((lesson: any) => {
      const monthIndex = lesson.month - 1;
      monthlyStats[monthIndex].totalRevenue += lesson.revenue;
      monthlyStats[monthIndex].materialPrice += lesson.materialPrice;
      monthlyStats[monthIndex].rentalPrice += lesson.rentalPrice;
      monthlyStats[monthIndex].etcPrice += lesson.etcPrice;
      monthlyStats[monthIndex].totalSales +=
        lesson.materialPrice + lesson.rentalPrice + lesson.etcPrice;
    });

    monthlyStats.forEach((stat) => {
      stat.netProfit = stat.totalRevenue - stat.totalSales;
    });

    return monthlyStats;
  }, [lessonRevenue]);

  // chart 데이터 가공
  const chartData = useMemo(() => {
    if (!lessonRevenue) return [];

    const monthlyRevenue = Array(12).fill(0);
    const monthlyNetProfit = Array(12).fill(0);

    lessonRevenue.forEach((lesson: any) => {
      const monthIndex = lesson.month - 1;
      monthlyRevenue[monthIndex] += lesson.revenue;
    });

    calculatorData.forEach((data) => {
      monthlyNetProfit[data.month - 1] = data.netProfit;
    });

    // chartData 형식으로 변환
    const data1 = monthlyRevenue.map((revenue, index) => ({
      x: index + 1,
      y: revenue,
    }));

    const data2 = monthlyNetProfit.map((netProfit, index) => ({
      x: index + 1,
      y: netProfit,
    }));

    return [
      { id: '매출액', data: data1 },
      { id: '순수익', data: data2 },
    ];
  }, [lessonRevenue, calculatorData]);

  return (
    <div>
      <Topbar
        title='매출 관리'
        onClick={() => navigate('/mypage/host/sales')}
      />
      <div className='flex justify-between font-hanaMedium text-xl mt-4 px-6'>
        <p>{lessonRevenue?.[0]?.title || '클래스명'} 매출액</p>
        <p>{year}년</p>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className='w-[351px] h-[252px] mt-3 bg-white rounded-xl shadow-md'>
          <p className='text-right text-[8px] mr-2 mt-2 font-hanaLight'>
            단위 : 원
          </p>
          <LineChart data={chartData} />
        </div>
      </div>
      <p className='font-hanaMedium text-xl mt-7 mb-5 px-6'>순수익 계산기</p>
      <div className='flex justify-center items-center flex-col mb-32'>
        <Calculator
          data={calculatorData}
          lessonId={Number(lesson_id)}
          year={Number(year)}
        />
      </div>
    </div>
  );
};
