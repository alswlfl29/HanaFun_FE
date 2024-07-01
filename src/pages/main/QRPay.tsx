import { useLocation, useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { qrUserInfo } from '../../components/molecules/QRScanner';
import { Button } from '../../components/common/Button';
import { useEffect, useState } from 'react';
import {
  AccountType,
  ChoiceAccount,
} from '../../components/organisms/ChoiceAccount';
import { userDummyData } from './HanaFunMain';
import { InputMoney } from '../../components/Atom/InputMoney';
import { ChoiceInput } from '../../components/molecules/ChoiceInput';
import { CompleteSend } from '../../components/organisms/CompleteSend';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { ModalBottomContainer } from '../../components/organisms/ModalBottomContainer';

export const QRPay = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userInfo: qrUserInfo = location.state;
  const [isBtnActive, setIsBtnActive] = useState<boolean>(false);
  const selectedAccount = (account: AccountType) => {}; // 호스트 계좌 ID
  const [showLessonList, setShowLessonList] = useState<boolean>(false);
  const [selectedLesson, setSelectedLesson] =
    useState<HostLessonInfoType | null>(null);
  const [showLessonDateList, setShowLessonDateList] = useState<boolean>(false);
  const [selectedLessonDate, setSelectedLessonDate] =
    useState<HostLessonDetailType | null>(null);
  const [money, setMoney] = useState<number>(-1);
  const [isSend, setIsSend] = useState<boolean>(false);

  const { data: hostLessons } = useQuery({
    queryKey: ['hostLessons'],
    queryFn: async () => {
      const response = await ApiClient.getHostLesson();
      return response;
    },
  });

  const { data: hostLessonDetail } = useQuery({
    queryKey: ['hostLessonDetail'],
    queryFn: async () => {
      const response = await ApiClient.getHostLessonDetail();
      return response;
    },
  });

  const onChangeLesson = (lesson: HostLessonInfoType) => {
    setSelectedLesson(lesson);
    setShowLessonList(false);
    checkValid();
  };

  const onChangeLessonDate = (date: HostLessonDetailType) => {
    setSelectedLessonDate(date);
    setShowLessonDateList(false);
    checkValid();
  };

  const onChangeMoney = (money: number) => {
    setMoney(money);
  };

  const checkValid = () => {
    if (
      selectedLesson &&
      selectedLessonDate &&
      money > 0 &&
      money <= userInfo.balance
    )
      setIsBtnActive(true);
    else setIsBtnActive(false);
  };
  const handleSendPayment = () => {
    console.log('게스트ID>>', userInfo.userId);
    console.log('출금계좌ID>>', userInfo.accountId);
    console.log('입금계좌ID>>', 1);
    console.log('클래스 ID>>', selectedLesson?.lesson_id);
    console.log('클래스일정ID>>', selectedLessonDate?.lessondate_id);
    console.log('지불금액>>', money);
    setIsSend(true);
  };

  useEffect(() => {
    checkValid();
  }, [money, selectedLesson?.lesson_id, selectedLessonDate?.lessondate_id]);

  return (
    <>
      {hostLessons && showLessonList && (
        <ModalBottomContainer
          color='#FFFFFF'
          onClose={() => setShowLessonList(false)}
        >
          <h3 className='font-hanaBold text-lg'>클래스를 선택해주세요.</h3>
          <div className='w-full'>
            <hr />
            <div className='max-h-60 overflow-y-auto scrollbar-hide px-6 py-2'>
              {hostLessons.map((lesson, idx) => (
                <div key={idx}>
                  <p
                    className='py-2 font-hanaRegular text-base cursor-pointer pl-1'
                    onClick={() => onChangeLesson(lesson)}
                  >
                    {lesson.title}
                  </p>
                  {idx !== hostLessons.length - 1 && <hr />}
                </div>
              ))}
            </div>
          </div>
        </ModalBottomContainer>
      )}
      {hostLessonDetail && showLessonDateList && (
        <ModalBottomContainer
          color='#FFFFFF'
          onClose={() => setShowLessonDateList(false)}
        >
          <h3 className='font-hanaBold text-lg'>클래스 일정을 선택해주세요.</h3>
          <div className='w-full'>
            <hr />
            <div className='max-h-60 overflow-y-auto scrollbar-hide px-6 py-2'>
              {hostLessonDetail.map((date, idx) => (
                <div key={idx}>
                  <p
                    className='py-2 font-hanaRegular text-base cursor-pointer pl-1'
                    onClick={() => onChangeLessonDate(date)}
                  >
                    {date.date}
                  </p>
                  {idx !== hostLessonDetail.length - 1 && <hr />}
                </div>
              ))}
            </div>
          </div>
        </ModalBottomContainer>
      )}
      <Topbar title='QR결제' onClick={() => navigate('/')} />
      {!isSend ? (
        <>
          <div className='pt-5 px-5 mb-11'>
            <ChoiceAccount
              accounts={[userDummyData.accounts[0]]}
              selectedAccount={selectedAccount}
              isSelectBtn={false}
            />
          </div>
          <div className='px-5 mb-12'>
            <h3 className='font-hanaBold mb-2'>클래스</h3>
            <ChoiceInput
              isChoice={!!selectedLesson}
              content={
                selectedLesson ? selectedLesson.title : '클래스를 선택해주세요.'
              }
              openModal={() => setShowLessonList(true)}
            />
            {selectedLesson && (
              <>
                <h3 className='font-hanaBold mt-6 mb-2'>클래스 일정</h3>
                <ChoiceInput
                  isChoice={!!selectedLessonDate}
                  content={
                    selectedLessonDate
                      ? selectedLessonDate.date
                      : '클래스 일정을 선택해주세요.'
                  }
                  openModal={() => setShowLessonDateList(true)}
                />
              </>
            )}
          </div>

          <InputMoney
            maxMoney={userInfo.balance}
            isChangeMoney={true}
            changeMoney={onChangeMoney}
          />
        </>
      ) : (
        <CompleteSend title2='결제 성공' />
      )}
      <Button
        message={!isSend ? '결제' : '완료'}
        isActive={!isSend ? isBtnActive : true}
        onClick={() => {
          !isSend ? handleSendPayment() : navigate('/');
        }}
      />
    </>
  );
};
