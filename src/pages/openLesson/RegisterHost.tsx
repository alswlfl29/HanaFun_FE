import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { Button } from '../../components/common/Button';
import { userDummyData } from '../main/HanaFunMain';
import {
  AccountType,
  ChoiceAccount,
} from '../../components/organisms/ChoiceAccount';
import { useRef, useState } from 'react';
import { CompleteSend } from '../../components/organisms/CompleteSend';

export const RegisterHost = () => {
  const navigate = useNavigate();
  const [isSend, setIsSend] = useState<boolean>(false);
  const [account, setAccount] = useState<AccountType | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const selectedAccountId = (account: AccountType) => {
    setAccount(account);
  };

  const handleRegisterHost = () => {
    if (account && inputRef.current) {
      console.log(account.accountId + ' ' + inputRef.current.value);
      setIsSend(true);
    }
  };

  return (
    <>
      <Topbar title='호스트 등록' onClick={() => navigate(-1)} />
      {!isSend ? (
        <div className='pt-5 px-5 mb-28'>
          <div className='w-full bg-white rounded-2xl px-6 py-2 flex justify-between items-center'>
            <img src='/images/mascot4.svg' alt='별돌이' className='w-16' />
            <span className='font-hanaRegular text-[#5C5C5C] whitespace-pre-line text-base text-center'>{`앗! 아직 호스트 등록을 안 하셨군요!\n제가 호스트 등록을 도와드릴게요.`}</span>
          </div>
          <div className='mt-5'>
            <h2 className='font-hanaBold text-xl mb-2'>입금계좌</h2>
            <ChoiceAccount
              accounts={userDummyData.accounts}
              selectedAccount={selectedAccountId}
              isSelectBtn={true}
            />
          </div>
          <div className='mt-5'>
            <h2 className='font-hanaBold text-xl mb-2'>소개</h2>
            <textarea
              ref={inputRef}
              placeholder='간단한 소개를 입력해주세요!(100자 이내)'
              maxLength={100}
              className='w-full h-24 rounded-2xl font-hanaRegular text-xs placeholder:text-hanaSilver p-4 focus:outline-none'
            ></textarea>
          </div>
        </div>
      ) : (
        <CompleteSend
          title1='호스트 등록이 완료되었습니다.'
          title2='환영합니다. 호스트님!'
        />
      )}
      <Button
        isActive={true}
        message={!isSend ? '등록' : '클래스 개설하기'}
        onClick={() =>
          !isSend ? handleRegisterHost() : navigate('/open-lesson/lesson')
        }
      />
    </>
  );
};
