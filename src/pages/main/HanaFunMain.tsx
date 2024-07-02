import { useEffect, useState } from 'react';
import { GoKebabHorizontal } from 'react-icons/go';
import DropdownSingle from '../../components/common/DropdownSingle';
import { InfoCard } from '../../components/molecules/InfoCard';
import {
  TbCircleNumber1,
  TbCircleNumber2,
  TbCircleNumber3,
} from 'react-icons/tb';
import { PopularLessonItem } from '../../components/molecules/PopularLessonItem';
import { AccountPwKeypad } from '../../components/organisms/AccountPwKeypad';
import { Slide } from '../../components/organisms/Slide';
import { QR } from '../../components/molecules/QR';
import { AccountType } from '../../components/organisms/ChoiceAccount';
import { RiQrScan2Line } from 'react-icons/ri';
import { Lessondata } from '../search/LessonSearch';
import { getCookie, setCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';
import { QRScanner } from '../../components/molecules/QRScanner';

export const userDummyData = {
  userId: 1,
  name: '오감자',
  accounts: [
    {
      accountId: 1,
      accountName: '영하나플러스통장',
      accountNumber: '748-911331-11111',
      balance: 100000,
    },
    {
      accountId: 2,
      accountName: '영둘플러스통장',
      accountNumber: '748-911331-22222',
      balance: 200000,
    },
    {
      accountId: 3,
      accountName: '영셋플러스통장',
      accountNumber: '748-911331-33333',
      balance: 300000,
    },
  ],
};

const accountSliderSettings = {
  className: 'center',
  centerMode: true,
  infinite: true,
  centerPadding: '15px',
  slidesToShow: 1,
  speed: 500,
  draggable: true,
  arrows: false,
};

const infoCardSliderSettings = {
  dots: true,
  slidesToShow: 1,
  speed: 500,
  draggable: true,
  arrows: false,
  infinite: false,
};

export const HanaFunMain = () => {
  const navigate = useNavigate();
  const [showKeypad, setShowKeypad] = useState<boolean>(false);
  const [showQr, setShowQr] = useState<boolean>(false);
  const [isScan, setIsScan] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  setCookie(
    'token',
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsnbTrr7zsp4AiLCJ1c2VySWQiOjEsImlhdCI6MTcxOTkwNjc5OCwiZXhwIjoxNzE5OTEwMzk4fQ.XrNBs6nWmQanGcsMQZFNVHT-xPmvvOPb3icd1naFjrE'
  );

  const [selectedAccount, setSelectedAccount] = useState<AccountType>({
    accountId: -1,
    accountName: '',
    accountNumber: '',
    balance: 0,
  });

  const sendAccountPassword = (password: string) => {
    console.log('비밀번호>>', password);
    console.log('로그인');
    setShowKeypad(false);
    setActive(null);
    setShowQr(true);
  };

  const clickedAccount = (account: AccountType, index: number) => {
    handleModalOpen(index);
    setSelectedAccount({
      accountId: account.accountId,
      accountNumber: account.accountNumber,
      accountName: account.accountName,
      balance: account.balance,
    });
  };

  const handleModalOpen = (index: number) => {
    setActive(active === index ? null : index);
  };

  // useEffect(() => {
  //   const token = getCookie('token');
  //   if (!token) navigate('/hana');
  // }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.lesson-card') && active !== null) {
        setActive(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [active]);

  return (
    <>
      {isScan && <QRScanner onClose={() => setIsScan(false)} />}
      {showKeypad && (
        <AccountPwKeypad
          handleClickedPassword={(pw: string) => sendAccountPassword(pw)}
          onClose={() => {
            setShowKeypad(false);
            setActive(null);
          }}
        />
      )}
      {showQr && (
        <QR
          userId={userDummyData.userId}
          accountId={selectedAccount.accountId}
          accountNumber={selectedAccount.accountNumber}
          balance={selectedAccount.balance}
          onClose={() => setShowQr(false)}
        />
      )}
      <div className='pt-8 px-5 mb-32'>
        <div className='flex items-center justify-between'>
          <p className='font-hanaBold text-xl text-hanaGreen'>
            {userDummyData.name} <span className='text-black'>님</span>
          </p>
          <button
            className='flex justify-center items-center font-hanaMedium gap-1.5 text-base text-black/80'
            onClick={() => setIsScan(true)}
          >
            <RiQrScan2Line size={20} />
            QR스캔
          </button>
        </div>

        <div className='mt-6 flex items-center justify-center'>
          <Slide settings={accountSliderSettings} cssName='custom-slider'>
            {userDummyData.accounts.map((account, index) => (
              <div
                key={account.accountId}
                className='relative w-full bg-white rounded-2xl py-5 px-7 font-hanaBold'
              >
                <div className='lesson-card flex items-center justify-between'>
                  <span className='text-black text-lg'>
                    {account.accountName}
                  </span>
                  <GoKebabHorizontal
                    color='#B5B5B5'
                    size={16}
                    className='rotate-90 cursor-pointer'
                    onClick={() => clickedAccount(account, index)}
                  />
                  {active === index && (
                    <div className='absolute right-0 mr-11'>
                      <DropdownSingle
                        image='/images/qr.svg'
                        text='QR생성'
                        handleClick={() => setShowKeypad(true)}
                      />
                    </div>
                  )}
                </div>
                <p className='text-hanaSilver text-sm mt-0.5'>
                  {account.accountNumber}
                </p>
                <p className='text-black text-lg flex justify-end mt-4'>
                  {account.balance.toLocaleString()}원
                </p>
              </div>
            ))}
          </Slide>
        </div>

        <div className='mt-6 w-full flex items-center justify-center'>
          <Slide settings={infoCardSliderSettings} cssName='custom-slider2'>
            <div className='bg-hanaNavGreen pt-6 px-7 rounded-2xl h-56 overflow-hidden'>
              <h1 className='text-white font-hanaBold whitespace-pre-line text-2xl'>{`취미 없인 못 살아!\n나의 취미를 찾는 방법`}</h1>
              <div className='flex text-white font-hanaMedium text-sm mt-2 justify-between'>
                넘겨서 보기
                <img src='/images/mascot2.svg' alt='별돌이' className='w-30' />
              </div>
            </div>
            <InfoCard
              Icon={TbCircleNumber1}
              title='인기 클래스를 확인해요'
              desc='대중적으로 인기가 많은 클래스에서 내 취향을 찾을 수 있어요.'
              image='/images/infocard1.svg'
            />
            <InfoCard
              Icon={TbCircleNumber2}
              title='탐색에서 원하는 클래스를 찾아봐요'
              desc='카테고리를 선택하고 듣고 싶은 클래스를 찾아서 신청할 수 있어요.'
              image='/images/infocard2.svg'
            />
            <InfoCard
              Icon={TbCircleNumber3}
              title='직접 호스트가 되어보아요'
              desc='간단한 클래스 개설로 나의 취미를 다른 사람들과 함께 나눌 수 있어요.'
              image='/images/infocard3.svg'
            />
            <>
              <div className='bg-hanaNavGreen h-56 flex justify-evenly items-center rounded-2xl text-white font-hanaBold whitespace-pre-line text-center px-4'>
                <p>{`앞으로도 하나은행이\n평생 취미가 생길 수 있도록\n옆에서 도와드릴게요~`}</p>
                <img src='/images/mascot1.svg' alt='별돌이' className='w-30' />
              </div>
            </>
          </Slide>
        </div>

        <div className='mt-8'>
          <h1 className='font-hanaBold text-xl mb-1.5'>인기클래스</h1>
          <div className='flex gap-2.5 overflow-x-auto scroll'>
            {Lessondata.map((item, index) => (
              <PopularLessonItem
                key={index}
                id={item.lesson_id}
                img={item.image}
                title={item.title}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
