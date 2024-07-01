import { useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { LessonSalesList } from '../organisms/LessonSalesList';
import { PieChart } from './PieChart';

interface Iprops {
  initYear: number;
  initMonth: number;
  data: MonthSalesType[] | undefined;
}

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('ko-KR').format(value);
};

export const TotalSalesCard = ({ initYear, initMonth, data }: Iprops) => {
  const [year, setYear] = useState(initYear);
  const [month, setMonth] = useState(initMonth);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const monthTotal =
    data?.reduce((total, item) => total + item.revenue, 0) || 0;

  const handlePreviousMonth = () => {
    if (month === 1) {
      setYear((prevYear) => prevYear - 1);
      setMonth(12);
    } else {
      setMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (year === currentYear && month === currentMonth) {
      return;
    }
    if (month === 12) {
      setYear((prevYear) => prevYear + 1);
      setMonth(1);
    } else {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(e.target.value));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(e.target.value));
  };

  return (
    <div className='w-[351px] h-[476px] mt-5 shadow-md rounded-lg text-center bg-white font-hanaMedium'>
      {/* navigate */}
      <div className='flex flex-row justify-center mt-5'>
        <GrFormPrevious
          className='mt-1 mr-20 cursor-pointer'
          onClick={handlePreviousMonth}
        />
        <div>
          <select value={year} onChange={handleYearChange}>
            {Array.from({ length: 10 }, (_, i) => currentYear - i).map(
              (yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}년
                </option>
              )
            )}
          </select>
          <select value={month} onChange={handleMonthChange}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((monthOption) => (
              <option key={monthOption} value={monthOption}>
                {monthOption}월
              </option>
            ))}
          </select>
        </div>
        <GrFormNext
          className='mt-1 ml-20 cursor-pointer'
          onClick={handleNextMonth}
        />
      </div>

      {/* month total */}
      <p className='text-xl mt-6'>{formatNumber(monthTotal)} 원</p>

      {/* chart */}
      <div className='w-80 h-52 ml-4 flex justify-center items-center'>
        <PieChart data={data} />
      </div>
      <LessonSalesList year={year} data={data} />
    </div>
  );
};
