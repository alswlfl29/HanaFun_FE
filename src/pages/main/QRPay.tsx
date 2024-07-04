import { useLocation, useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { qrUserInfo } from '../../components/molecules/QRScanner';
import { Button } from '../../components/common/Button';
import { useEffect, useState } from 'react';
import { ChoiceAccount } from '../../components/organisms/ChoiceAccount';
import { InputMoney } from '../../components/Atom/InputMoney';
import { ChoiceInput } from '../../components/molecules/ChoiceInput';
import { CompleteSend } from '../../components/organisms/CompleteSend';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { ModalBottomContainer } from '../../components/organisms/ModalBottomContainer';
import { useModal } from '../../context/ModalContext';
import { Loading } from '../Loading';

export const QRPay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  const userInfo: qrUserInfo = location.state;
  const [isBtnActive, setIsBtnActive] = useState<boolean>(false);
  const [showLessonList, setShowLessonList] = useState<boolean>(false);
  const [selectedLesson, setSelectedLesson] = useState<LessonType | null>(null);
  const [showLessonDateList, setShowLessonDateList] = useState<boolean>(false);
  const [selectedLessonDate, setSelectedLessonDate] =
    useState<HostLessonDetailType | null>(null);
  const [money, setMoney] = useState<number>(-1);
  const [isSend, setIsSend] = useState<boolean>(false);

  const { mutate: postQrPay } = useMutation({
    mutationFn: (reqData: QrPayReqType) => {
      const res = ApiClient.getInstance().postQrPay(reqData);
      return res;
    },
    onSuccess: (data) => {
      if (data.isSuccess && data.data?.transactionId) setIsSend(true);
    },
  });

  const onChangeLesson = (lesson: LessonType) => {
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
      userInfo.accountId &&
      hostInfo?.data?.account.accountId &&
      selectedLesson?.lessonId &&
      selectedLessonDate?.lessondateId &&
      money > 0 &&
      money <= userInfo.balance
    )
      setIsBtnActive(true);
    else setIsBtnActive(false);
  };

  const handleSendPayment = () => {
    if (hostInfo && hostInfo.data && selectedLesson && selectedLessonDate) {
      postQrPay({
        withdrawId: userInfo.accountId,
        depositId: hostInfo.data.account.accountId,
        lessonId: selectedLesson.lessonId,
        lessondateId: selectedLessonDate.lessondateId,
        payment: money,
      });
    }
  };

  useEffect(() => {
    if (!getHostInfoLoading && !getHostInfoError) checkValid();
  }, [money, selectedLesson?.lessonId, selectedLessonDate?.lessondateId]);

  const {
    data: hostInfo,
    isError: getHostInfoError,
    isLoading: getHostInfoLoading,
  } = useQuery({
    queryKey: ['hostLessons', userInfo.accountId],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getHostInfo();
      return response;
    },
    retry: 1,
  });

  const { data: hostLessonDetail } = useQuery({
    queryKey: ['hostLessonDetail', selectedLesson?.lessonId],
    queryFn: async () => {
      if (!selectedLesson || !selectedLesson.lessonId) return;
      const response = await ApiClient.getInstance().getHostLessonDetailList(
        selectedLesson.lessonId
      );
      return response;
    },
    enabled: !!selectedLesson && !!selectedLesson.lessonId,
  });

  if (getHostInfoLoading) return <Loading />;

  if (getHostInfoError) {
    openModal('호스트가 아닙니다. 호스트 등록을 먼저 해주세요.', closeModal);
    navigate('/');
  }

  return (
    <>
      {hostInfo && hostInfo.data && showLessonList && (
        <ModalBottomContainer
          color='#FFFFFF'
          onClose={() => setShowLessonList(false)}
        >
          <h3 className='font-hanaBold text-lg'>클래스를 선택해주세요.</h3>
          <div className='w-full'>
            <hr />
            <div className='max-h-60 overflow-y-auto scrollbar-hide px-6 py-2'>
              {hostInfo.data?.lessonList.map((lesson, idx) => (
                <div key={idx}>
                  <p
                    className='py-2 font-hanaRegular text-base cursor-pointer pl-1'
                    onClick={() => onChangeLesson(lesson)}
                  >
                    {lesson.title}
                  </p>
                  {idx + 1 !== hostInfo.data?.lessonList.length && <hr />}
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
              {hostLessonDetail.data?.map((date, idx) => (
                <div key={idx}>
                  <p
                    className='py-2 font-hanaRegular text-base cursor-pointer pl-1'
                    onClick={() => onChangeLessonDate(date)}
                  >
                    {date.date}
                  </p>
                  {idx + 1 !== hostLessonDetail.data?.length && <hr />}
                </div>
              ))}
            </div>
          </div>
        </ModalBottomContainer>
      )}
      <Topbar title='QR결제' onClick={() => navigate('/')} />
      {hostInfo && hostInfo.data && (
        <>
          {!isSend ? (
            <>
              <div className='pt-5 mb-11'>
                <ChoiceAccount
                  accounts={[hostInfo?.data?.account]}
                  isSelectBtn={false}
                />
              </div>
              <div className='px-5 mb-12'>
                <h3 className='font-hanaBold mb-2'>클래스</h3>
                <ChoiceInput
                  isChoice={!!selectedLesson}
                  content={
                    selectedLesson
                      ? selectedLesson.title
                      : '클래스를 선택해주세요.'
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
        </>
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
