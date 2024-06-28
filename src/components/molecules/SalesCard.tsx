import { useNavigate } from 'react-router-dom';

export const SalesCard = () => {
  const navigate = useNavigate();
  return (
    <div
      className='w-[351px] h-[185px] mt-5 px-7 border-[1px] bg-white rounded-xl shadow-md flex justify-between cursor-pointer'
      onClick={() => navigate('/sales')}
    >
      <div className='flex flex-col mt-10'>
        <p className='font-hanaMedium text-xl'>나의 매출액 관리</p>
        <p className='font-hanaRegular text-base mt-8 text-hanaSilver'>
          클래스별 매출을 확인하고,
          <br />
          순수익을 계산해보세요!
        </p>
      </div>
      <img src='/images/mypage/sales.gif' alt='' className='w-24 h-32 mt-8' />
    </div>
  );
};
