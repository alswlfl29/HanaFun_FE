import { useRef, useState } from 'react';
import { Button } from '../../components/common/Button';
import { Topbar } from '../../components/common/Topbar';
import { userDummyData } from '../main/HanaFunMain';
import {
  AccountType,
  ChoiceAccount,
} from '../../components/organisms/ChoiceAccount';
import { InputMoney } from '../../components/Atom/InputMoney';
import { FaRegCheckCircle } from 'react-icons/fa';
import { changeMoneyFormat } from '../../utils/changeMoney';
import { IoCloseCircle } from 'react-icons/io5';
import { ModalBottomContainer } from '../../components/organisms/ModalBottomContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { AccountPwKeypad } from '../../components/organisms/AccountPwKeypad';
import { CompleteSend } from '../../components/organisms/CompleteSend';

export const PayLesson = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [account, setAccount] = useState<AccountType | null>(null);
  const [checkHanaMoney, setCheckHanaMoney] = useState<boolean>(false);
  const hanamoneyInputRef = useRef<HTMLInputElement | null>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [activeBtn, setActiveBtn] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPwModal, setShowPwModal] = useState<boolean>(false);
  const [isSend, setIsSend] = useState<boolean>(false);

  const handleChangeHanaMoney = () => {
    if (hanamoneyInputRef.current) {
      hanamoneyInputRef.current.value = changeMoneyFormat(
        hanamoneyInputRef.current.value
      );
      // 하나머니 잔액으로 체크
      if (+hanamoneyInputRef.current.value.replace(/[,]/gi, '') > 3000) {
        setShowMessage(true);
        setActiveBtn(false);
        return;
      }
      setShowMessage(false);
      +hanamoneyInputRef.current.value === 0
        ? setActiveBtn(false)
        : setActiveBtn(true);
    }
  };

  const handleCancleHanaMoney = () => {
    if (hanamoneyInputRef.current) {
      hanamoneyInputRef.current.value = '0';
      setActiveBtn(false);
    }
  };

  const selectedAccount = (account: AccountType) => {
    setAccount(account);
  };

  const handlePayment = () => {
    if (account) {
      console.log('출금 계좌Id>>', account.accountId);
      console.log('클래스 Id>>', state.lessonId);
      console.log('클래스 일정>>', state.lessondate_id);
      console.log('수량>>', state.count);
      console.log('지불금액>>', state.payment);
      console.log(
        '하나머니사용금액>>',
        hanamoneyInputRef.current && checkHanaMoney
          ? +hanamoneyInputRef.current.value.replace(/[,]/gi, '')
          : 0
      );
      setShowPwModal(true);
    }
  };

  const sendAccountPassword = (password: string) => {
    setShowPwModal(false);
    setShowModal(false);
    setIsSend(true);
    console.log('비밀번호>>', password);
  };

  return (
    <>
      {showModal && (
        <ModalBottomContainer
          color='#FFFFFF'
          onClose={() => setShowModal(false)}
        >
          <h1 className='font-hanaRegular text-xl text-[#B6B6B6]'>
            <span className='font-hanaBold text-black'>{state.payment}</span>원
            결제합니다.
          </h1>
          <hr className='w-[85%]' />
          <div className='w-[85%] mt-3 flex flex-col gap-3 mb-44'>
            <div className='flex justify-between items-center font-hanaMedium text-sm '>
              <h3 className='text-[#8D9695]'>출금계좌</h3>
              <p className='text-right whitespace-pre-line'>{`하나은행\n${account?.accountNumber}`}</p>
            </div>
            {checkHanaMoney && (
              <div className='flex justify-between items-center font-hanaMedium text-sm '>
                <h3 className='text-[#8D9695]'>하나머니 사용금액</h3>
                <p>{hanamoneyInputRef.current?.value} 원</p>
              </div>
            )}
          </div>
          <div className='grid w-[90%] grid-cols-3 mb-6 gap-5'>
            <button
              className='col-span-1 bg-hanaSilver rounded-2xl py-4 text-xl font-hanaBold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]'
              onClick={() => setShowModal(false)}
            >
              취소
            </button>
            <button
              className='col-span-2 rounded-2xl py-4 text-xl font-hanaBold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)] bg-hanaNavGreen'
              onClick={handlePayment}
            >
              결제하기
            </button>
          </div>
        </ModalBottomContainer>
      )}
      {showPwModal && (
        <AccountPwKeypad
          handleClickedPassword={(pw: string) => sendAccountPassword(pw)}
          onClose={() => setShowPwModal(false)}
        />
      )}
      <Topbar title='결제' onClick={() => navigate(-1)} />
      {!isSend ? (
        <div className='pt-5 mb-28'>
          <div className='mt-6'>
            <ChoiceAccount
              accounts={userDummyData.accounts}
              selectedAccount={selectedAccount}
              isSelectBtn={true}
            />
          </div>
          <InputMoney maxMoney={state.payment} isChangeMoney={false} />
          <div
            className='px-5 mt-16 flex items-center gap-2 font-hanaMedium text-hanaGreen text-sm'
            onClick={() => {
              setCheckHanaMoney((prev) => !prev);
              setActiveBtn(checkHanaMoney);
            }}
          >
            <FaRegCheckCircle
              size={18}
              color={checkHanaMoney ? '#008485' : '#B5B5B5'}
            />
            하나머니 사용하기
          </div>
          {checkHanaMoney && (
            <div className='px-5'>
              <div className='mt-2 flex justify-between items-center bg-hanaGreen rounded-2xl px-5 py-4 font-hanaRegular text-white'>
                <p>하나머니 잔액</p>
                {Number(3000).toLocaleString()}
              </div>
              <div className='mt-5 font-hanaMedium'>
                <h3>사용금액</h3>
                <div className='mt-3 flex justify-between items-center border-b-[1px] border-hanaSilver'>
                  <input
                    ref={hanamoneyInputRef}
                    type='text'
                    placeholder='금액을 입력해주세요.'
                    onChange={handleChangeHanaMoney}
                    className='w-[90%] placeholder:text-hanaSilver font-hanaRegular text-sm pb-1 bg-transparent focus:outline-none'
                  />
                  <IoCloseCircle
                    size={20}
                    color='#B5B5B5'
                    onClick={handleCancleHanaMoney}
                  />
                </div>
                {showMessage && (
                  <p className='mt-1 font-hanaLight text-xs text-hanaRed'>
                    하나머니 잔액이 부족합니다.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <CompleteSend title2='클래스가 신청되었습니다.' />
      )}
      <Button
        message={!isSend ? '다음' : '완료'}
        isActive={!isSend ? activeBtn : true}
        onClick={() => {
          !isSend ? setShowModal(true) : navigate('/my-lesson-list');
        }}
      />
    </>
  );
};
