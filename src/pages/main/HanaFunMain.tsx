import { useState } from 'react';
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

const bestLessonDummyData = [
  {
    image: 'https://picsum.photos/200/200',
    title: '나만의 반려식물, 테라리움 만들기1',
  },
  {
    image: 'https://picsum.photos/200/200',
    title: '나만의 반려식물, 테라리움 만들기2',
  },
  {
    image: 'https://picsum.photos/200/200',
    title: '나만의 반려식물, 테라리움 만들기3',
  },
  {
    image: 'https://picsum.photos/200/200',
    title: '나만의 반려식물, 테라리움 만들기4',
  },
  {
    image: 'https://picsum.photos/200/200',
    title: '나만의 반려식물, 테라리움 만들기5',
  },
];

export const HanaFunMain = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showKeypad, setShowKeypad] = useState<boolean>(false);
  const [showQr, setShowQr] = useState<boolean>(false);

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
    setShowDropdown(false);
    setShowQr(true);
  };

  const clickedAccount = (account: AccountType) => {
    setShowDropdown((showDropdown) => !showDropdown);
    setSelectedAccount({
      accountId: account.accountId,
      accountNumber: account.accountNumber,
      accountName: account.accountName,
      balance: account.balance,
    });
  };

  return (
    <>
      {showKeypad && (
        <AccountPwKeypad
          handleClickedPassword={(pw: string) => sendAccountPassword(pw)}
          onClose={() => {
            setShowKeypad(false);
            setShowDropdown(false);
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
      <div className='pt-5 px-5'>
        <div className='flex items-end justify-between'>
          <p className='flex items-end font-hanaBold text-2xl'>
            <img src='images/logo.svg' alt='logo' className='w-12 mr-2' />
            하나
            <span className='text-xl text-hanaGreen'>F</span>
            <span className='text-xl text-hanaRed'>u</span>
            <span className='text-xl text-hanaGold'>n</span>!
          </p>
          <p className='font-hanaBold text-xl text-hanaGreen'>
            {userDummyData.name} <span className='text-black'>님</span>
          </p>
        </div>
        <div className='mt-6 w-full flex items-center justify-center'>
          <Slide>
            {userDummyData.accounts.map((account) => (
              <div
                key={account.accountId}
                className='relative w-full bg-white rounded-2xl py-5 px-7 font-hanaBold'
              >
                <div className='flex items-center justify-between'>
                  <span className='text-black text-lg'>
                    {account.accountName}
                  </span>
                  <GoKebabHorizontal
                    color='#B5B5B5'
                    size={16}
                    className='rotate-90 cursor-pointer'
                    onClick={() => clickedAccount(account)}
                  />
                  {showDropdown && (
                    <div className='absolute right-0 mr-11'>
                      <DropdownSingle
                        image='images/qr.svg'
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
          <Slide>
            <div className='bg-hanaNavGreen pt-6 px-7 rounded-2xl h-56 overflow-hidden'>
              <h1 className='text-white font-hanaBold whitespace-pre-line text-2xl'>{`취미 없인 못 살아!\n나의 취미를 찾는 방법`}</h1>
              <div className='flex text-white font-hanaMedium text-sm mt-2 justify-between'>
                넘겨서 보기
                <img src='images/mascot2.svg' alt='별돌이' className='w-30' />
              </div>
            </div>
            <InfoCard
              Icon={TbCircleNumber1}
              title='인기 클래스를 확인해요'
              desc='대중적으로 인기가 많은 클래스에서 내 취향을 찾을 수 있어요.'
              image='images/infocard1.svg'
            />
            <InfoCard
              Icon={TbCircleNumber2}
              title='탐색에서 원하는 클래스를 찾아봐요'
              desc='카테고리를 선택하고 듣고 싶은 클래스를 찾아서 신청할 수 있어요.'
              image='images/infocard2.svg'
            />
            <InfoCard
              Icon={TbCircleNumber3}
              title='직접 호스트가 되어보아요'
              desc='간단한 클래스 개설로 나의 취미를 다른 사람들과 함께 나눌 수 있어요.'
              image='images/infocard3.svg'
            />
            <>
              <div className='bg-hanaNavGreen h-56 flex justify-evenly items-center rounded-2xl text-white font-hanaBold whitespace-pre-line text-center px-4'>
                <p>{`앞으로도 하나은행이\n평생 취미가 생길 수 있도록\n옆에서 도와드릴게요~`}</p>
                <img src='/images/mascot1.svg' alt='별돌이' className='w-30' />
              </div>
            </>
          </Slide>
        </div>

        <div className='mt-3'>
          <h1 className='font-hanaBold text-xl mb-1.5'>인기클래스</h1>
          <div className='flex gap-2.5 overflow-x-auto scroll'>
            {bestLessonDummyData.map((item, index) => (
              <PopularLessonItem
                key={index}
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
