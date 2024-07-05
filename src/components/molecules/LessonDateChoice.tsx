import { FC, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { LuMinus, LuPlus } from 'react-icons/lu';
import { formatDate } from '../../utils/formatDate';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

interface IProps {
  lessonId: number;
  dateList: LessonDateType[];
  price: number;
}

export const LessonDateChoice: FC<IProps> = ({ lessonId, dateList, price }) => {
  const navigate = useNavigate();
  const [choiceDate, setChoiceDate] = useState<{
    lessondate_id: number;
    date: string;
    quantityLeft: number;
  } | null>(null);
  const [count, setCount] = useState<number>(0);
  const [activeBtn, setActiveBtn] = useState<boolean>(false);

  const clickedChoiceDate = (
    lessondate_id: number,
    date: string,
    quantityLeft: number
  ) => {
    if (
      !choiceDate ||
      (choiceDate && choiceDate.lessondate_id !== lessondate_id)
    ) {
      setChoiceDate({
        lessondate_id,
        date,
        quantityLeft,
      });
      setCount(1);
      setActiveBtn(true);
    } else {
      plusCount();
    }
  };

  const plusCount = () => {
    if (choiceDate && count >= choiceDate.quantityLeft) return;
    setCount((prev) => (prev += 1));
  };
  const minusCount = () => {
    if (count === 1) return;
    setCount((prev) => (prev -= 1));
  };
  const cancleChoiceDate = () => {
    setChoiceDate(null);
    setCount(0);
    setActiveBtn(false);
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center w-full px-2 py-1 mb-24'>
        <div className='w-[95%] border-2 border-black rounded'>
          <h2 className='py-4 px-4 font-hanaMedium text-base bg-[#FAFAFA]'>
            일정 선택
          </h2>{' '}
          <div className='max-h-56 overflow-y-scroll'>
            {dateList.map((date, index) => (
              <div key={date.lessondateId}>
                <div
                  className='px-4 py-4 flex flex-col justify-center gap-1 cursor-pointer'
                  onClick={() =>
                    clickedChoiceDate(
                      date.lessondateId,
                      formatDate(
                        '' + date.date,
                        '' + date.startTime,
                        '' + date.endTime
                      ),
                      date.quantityLeft
                    )
                  }
                >
                  <p className='font-hanaRegular text-sm'>
                    {formatDate(
                      '' + date.date,
                      '' + date.startTime,
                      '' + date.endTime
                    )}
                  </p>
                  <p className='flex items-end gap-1 font-hanaBold text-sm'>
                    {price.toLocaleString()}원
                    <span className='font-hanaMedium text-xs text-hanaNavGray'>
                      {date.quantityLeft}개 남음
                    </span>
                  </p>
                </div>
                {index !== dateList.length && (
                  <hr className='border-[#EEEEEC]' />
                )}
              </div>
            ))}
          </div>
        </div>
        {choiceDate && (
          <div className='w-[95%] p-3 mt-8 bg-[#FAFAFA] border-[1px] border-hanaSilver rounded'>
            <p className='flex justify-between items-center'>
              <span className='font-hanaMedium text-sm'>{choiceDate.date}</span>
              <AiOutlineClose
                size={20}
                className='cursor-pointer'
                onClick={cancleChoiceDate}
              />
            </p>
            <div className='flex mt-5'>
              <button
                className={`rounded-l border border-hanaSilver py-1.5 px-1.5 ${count === 1 ? 'bg-[#EEEEEC]' : 'bg-white'}`}
                onClick={minusCount}
              >
                <LuMinus size={18} />
              </button>
              <p className='border-y border-hanaSilver py-1 px-4 bg-white'>
                {count}
              </p>
              <button
                className={`rounded-r border border-hanaSilver py-1.5 px-1.5 ${count === choiceDate.quantityLeft ? 'bg-[#EEEEEC]' : 'bg-white'}`}
                onClick={plusCount}
              >
                <LuPlus size={18} />
              </button>
            </div>
          </div>
        )}
        <hr className='border-[#EEEEEC] w-full my-4' />
        <div className='w-[90%] flex justify-between items-center'>
          <p className='font-hanaMedium text-base'>총 {count}개</p>
          <p className='font-hanaBold text-hanaGreen text-base'>
            {(count * price).toLocaleString()}원
          </p>
        </div>
      </div>
      <Button
        message='신청하기'
        isActive={activeBtn}
        onClick={() =>
          navigate('/pay', {
            state: {
              lessonId: lessonId,
              payment: count * price,
              lessondate_id: choiceDate?.lessondate_id || 0,
              count: count,
            },
          })
        }
      />
    </>
  );
};
