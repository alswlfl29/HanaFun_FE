import { useState, useEffect } from 'react';
import { LessonCard } from '../molecules/LessonCard';
import DropdownSingle from '../common/DropdownSingle';
import DropdownDouble from '../common/DropdownDouble';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';

interface IProps {
  data: Array<LessonType> | undefined;
  show: boolean;
  option: string;
}

export const LessonSlider = ({ data, show, option }: IProps) => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleModalOpen = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  const handleConfirm = (reservation_id: number) => {
    console.log(reservation_id);
    // reservation_id 값으로 예약 취소 api 요청
    openModal('예약이 취소되었습니다', () => navigate('/my-lesson-list'));
  };

  const handleReportConfirm = () => {
    openModal('신고가 접수되었습니다', closeModal);
  };

  const handleDelete = (reservation_id: number) => {
    openModal('예약을 취소하시겠습니까?', () => handleConfirm(reservation_id));
  };

  const handleReport = () => {
    openModal('해당 클래스를 신고하시겠습니까?', () => handleReportConfirm());
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.lesson-card') && activeCard !== null) {
        setActiveCard(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeCard]);

  return (
    <div className='mt-5 pb-1 overflow-x-scroll whitespace-nowrap scrollbar-hide'>
      {data?.map((myLesson, index) => (
        <div key={myLesson.lesson_id} className='inline-block relative'>
          <div className='lesson-card'>
            <LessonCard
              image={myLesson.image}
              title={myLesson.title}
              category={myLesson.location}
              date={myLesson.date}
              show={show}
              handleClick={() => handleModalOpen(index)}
            />
          </div>
          {activeCard === index && (
            <div className='absolute top-0 right-0 mr-4 flex justify-center items-center'>
              {option === 'single' && (
                <DropdownSingle
                  image='/images/mypage/dropdown_img.svg'
                  text='신고하기'
                  handleClick={() => {
                    handleReport();
                  }}
                />
              )}
              {option === 'double' && (
                <DropdownDouble
                  image1='/images/mypage/dropdown_trash.svg'
                  image2='/images/mypage/dropdown_img.svg'
                  text1='예약취소'
                  text2='신고하기'
                  handleClick1={() => {
                    handleDelete(myLesson.reservation_id);
                  }}
                  handleClick2={() => handleReport()}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
