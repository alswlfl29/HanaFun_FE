import { AiOutlineClose } from 'react-icons/ai';
import { FaBell, FaCalendarAlt, FaWallet } from 'react-icons/fa';
import { FcAdvertising } from 'react-icons/fc';
import { GoChevronRight } from 'react-icons/go';
import { HanaMainCard } from '../../components/molecules/HanaMainCard';
import { IoMdFootball } from 'react-icons/io';
import { BsAirplaneEnginesFill } from 'react-icons/bs';
import { LuChevronRight } from 'react-icons/lu';
import { HanaMainTag } from '../../components/molecules/HanaMainTag';

const hanaMainNav = [
  {
    name: '홈',
    image: '/images/navbar/active_home.svg',
  },
  {
    name: '상품',
    image: '/images/hanaMain/hanaMainNavProduct.svg',
  },
  {
    name: '자산',
    image: '/images/hanaMain/hanaMainNavAsset.svg',
  },
  {
    name: '주식',
    image: '/images/hanaMain/hanaMainNavStock.svg',
  },
  {
    name: '메뉴',
    image: '/images/hanaMain/hanaMainNavMenu.svg',
  },
];

export const HanaMain = () => {
  return (
    <>
      <div className='pt-5 px-5'>
        {/* 하나원큐 메인 상단 */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-center'>
            <img
              src='/images/hanaMain/person.svg'
              alt='person'
              className='w-[1.8rem] cursor-pointer'
            />
            <div className='w-[4.5rem] flex justify-center items-center font-hanaBold text-sm text-[#5D646D] border-2 border-[#49515A] rounded-xl px-2 py-[0.1rem] box-border ml-1'>
              전체계좌
            </div>
          </div>
          <div className='flex items-center'>
            <div className='flex items-center justify-center w-[3.5rem] bg-[#A5A8B5] font-hanaRegular rounded-md p-[0.2rem] text-sm cursor-pointer'>
              <p className='w-5 bg-white text-[#A5A8B5] rounded-md py-[0.1rem] px-1 text-center mr-[0.1rem]'>
                홈
              </p>
              <p className='text-white ml-[0.1rem]'>간편</p>
            </div>
            <FaWallet
              color='#A5A8B5'
              size={26}
              className='ml-3 cursor-pointer'
            />
            <FaBell color='#A5A8B5' size={26} className='ml-3 cursor-pointer' />
          </div>
        </div>

        {/* 하나원큐 베너 */}
        <div className='flex items-center justify-between w-full bg-[#EAEDF0] rounded-2xl py-3.5 px-4 font-hanaRegular text-[#393939] mt-6'>
          <p className='flex items-center'>
            <FcAdvertising size={24} className='mr-2' />
            하나원큐가 새롭게 바뀌었어요.
          </p>
          <AiOutlineClose size={18} className='cursor-pointer' />
        </div>

        {/* 하나원큐 계좌 */}
        <div className='bg-white rounded-2xl mt-6 py-7 px-6 drop-shadow-[1px_3px_4px_rgba(0,0,0,0.1)]'>
          <div className='flex flex-col justify-center items-center gap-1'>
            <p className='font-hanaRegular text-sm text-black/70'>
              로그인하고 안전하게
            </p>
            <p className='font-hanaMedium flex items-center text-xl'>
              잔액을 조회하세요 <GoChevronRight size={25} />
            </p>
            <img
              src='/images/hanaMain/bankbook.png'
              alt='bankbook'
              className='w-28'
            />
          </div>

          <div className='flex items-center justify-between font-hanaMedium mt-2 gap-3'>
            <button className='w-1/2 h-10 bg-[#EFF0F4] text-[#303031] rounded-[0.625rem]'>
              가져오기
            </button>
            <button className='w-1/2 h-10 bg-[#1EA698] text-white rounded-[0.625rem]'>
              보내기
            </button>
          </div>
        </div>

        {/* 하나원큐 카드 */}
        <div className='flex w-screen items-center mt-6 gap-3'>
          <HanaMainCard
            id={1}
            Icon={IoMdFootball}
            message={`매일매일 신나는\n축구Play`}
            color='black'
          />
          <HanaMainCard
            id={2}
            Icon={FaCalendarAlt}
            message={`취미를 나누는\n하나Fun`}
            color='#DF84AA'
          />
          <HanaMainCard
            id={3}
            Icon={BsAirplaneEnginesFill}
            message={`여행 전 체크 트래블로그`}
            color='#6A9BEE'
          />
        </div>

        {/* 하나원큐 마이데이터 */}
        <div className='mt-6 w-full h-48 bg-[#4E59C4] rounded-2xl p-6 text-white font-hanaMedium'>
          <div className='flex items-center justify-between'>
            <p className='flex items-center text-base'>
              마이데이터 자산
              <LuChevronRight size={22} color='white' />
            </p>
            <div className='text-sm flex items-center gap-1'>
              연결자산
              <div className='flex items-center justify-evenly w-14 bg-[#41499C] font-hanaMedium rounded-md p-[0.2rem] text-[0.6rem] cursor-pointer'>
                <p className='w-5 bg-white text-[#41499C] rounded-md text-center mr-[0.1rem]'>
                  ON
                </p>
                <p className='text-white ml-[0.1rem]'>OFF</p>
              </div>
            </div>
          </div>
          <p className='font-hanaBold text-2xl mt-5'>
            {Math.floor(Math.random() * 999999 + 1).toLocaleString()}
            <span className='font-hanaMedium ml-1'>원</span>
          </p>
        </div>
      </div>
      {/* 하나원큐 navbar */}
      <div className='absolute w-full bg-white rounded-t-[20px] bottom-0 h-36 px-5 pt-5 pb-6'>
        <div className='w-[500px] flex items-center gap-2'>
          <HanaMainTag icon='/images/hanaMain/hanaMainTag2.svg' name='운세' />
          <HanaMainTag icon='/images/hanaMain/hanaMainTag1.svg' name='상품몰' />
          <HanaMainTag
            icon='/images/hanaMain/hanaMainTag3.svg'
            name='전체계좌'
          />
          <HanaMainTag
            icon='/images/hanaMain/hanaMainTag4.svg'
            name='계좌이체'
          />
          <HanaMainTag
            icon='/images/hanaMain/hanaMainTag1.svg'
            name='하나머니'
          />
        </div>
        <hr className='my-3 border-[0.7px] border-[#E7E9EE]' />
        <div className='flex items-center justify-between px-3'>
          {hanaMainNav.map((item, index) => (
            <p
              key={index}
              className='flex flex-col items-center cursor-pointer'
            >
              <img src={item.image} alt={item.name} className='w-6 mb-0.5' />
              <span
                className={`font-hanaMedium text-base ${item.name === '홈' ? 'text-hanaNavGreen' : 'text-hanaNavGray'}`}
              >
                {item.name}
              </span>
            </p>
          ))}
        </div>
      </div>
    </>
  );
};
