import { FC, useEffect, useRef, useState } from 'react';
import { LuMinusCircle, LuPlusCircle } from 'react-icons/lu';
import { AddLessonInputLabel } from '../Atom/AddLessonInputLabel';
import { format } from 'date-fns';
import { useModal } from '../../context/ModalContext';

interface IProps {
  onChangeTimes: (lessontime: LessonDateCommonType[]) => void;
}

type TimeType = {
  id: number;
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
};

export const AddLessonTimeList: FC<IProps> = ({ onChangeTimes }) => {
  const inputTimeNextID = useRef<number>(1);
  const { openModal, closeModal } = useModal();
  const [inputTimeItems, setInputTimeItems] = useState<TimeType[]>([
    {
      id: 0,
      date: null,
      startTime: null,
      endTime: null,
    },
  ]);

  const handleCheckDuplicateDate = () => {
    openModal('이미 선택된 날짜입니다.', closeModal);
  };

  const addInput = () => {
    if (inputTimeItems.length >= 5) return;
    const input = {
      id: inputTimeNextID.current,
      date: null,
      startTime: null,
      endTime: null,
    };
    setInputTimeItems([...inputTimeItems, input]);
    inputTimeNextID.current += 1;
  };

  // input 삭제
  const deleteInput = (index: number) => {
    setInputTimeItems(inputTimeItems.filter((item) => item.id !== index));
  };

  const checkDuplicateDate = (date: string) => {
    let isDuplicate = false;
    inputTimeItems.map((time) => {
      if ('' + time.date === format(new Date(date), 'yyyy-MM-dd'))
        isDuplicate = true;
    });
    return isDuplicate;
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
    index: number
  ) => {
    if (index > inputTimeItems.length) return;
    const inputItemsCopy = JSON.parse(JSON.stringify(inputTimeItems));
    if (
      inputTimeItems.length > 1 &&
      inputTimeItems[0].date &&
      name === 'date' &&
      checkDuplicateDate(e.target.value)
    ) {
      handleCheckDuplicateDate();
      setInputTimeItems(inputTimeItems.filter((item) => item.id !== index));
      return;
    }
    if (name !== 'date') {
      const time_date = inputItemsCopy[index]['date']
        ? inputItemsCopy[index]['date'] + ' ' + e.target.value + ':00'
        : format(new Date(), 'yyyy-MM-dd') + ' ' + e.target.value + ':00';
      inputItemsCopy[index][name] = time_date;
    } else inputItemsCopy[index][name] = e.target.value;

    setInputTimeItems(inputItemsCopy);
  };

  const handlechangeTimes = () => {
    let datetime: LessonDateCommonType[] = [];
    inputTimeItems.map((time) => {
      if (
        time.date !== null &&
        time.startTime !== null &&
        time.endTime !== null
      ) {
        datetime = [
          ...datetime,
          {
            date: time.date,
            startTime: time.startTime,
            endTime: time.endTime,
          },
        ];
      }
    });
    onChangeTimes(datetime);
  };

  useEffect(() => {
    handlechangeTimes();
  }, [inputTimeItems]);

  return (
    <AddLessonInputLabel title='클래스 일정'>
      <div className='flex flex-col items-center justify-center gap-1'>
        {inputTimeItems.map((item, index) => (
          <div
            key={index}
            className={`w-full flex flex-col items-center justify-center gap-1 ${inputTimeItems.length > 1 && index !== inputTimeItems.length - 1 ? 'mb-2' : undefined}`}
          >
            <div className='w-full flex flex-col'>
              <span className={`font-hanaLight text-xs text-black/70 mb-1`}>
                클래스 날짜
              </span>
              <p className='w-full flex items-center justify-between gap-2'>
                <input
                  type='date'
                  min={format(
                    new Date(new Date().setDate(new Date().getDate())),
                    'yyyy-MM-dd'
                  )}
                  value={
                    item.date ? format(new Date(item.date), 'yyyy-MM-dd') : ''
                  }
                  className='w-full text-center rounded border-[0.7px] border-hanaSilver text-xs placeholder:text-hanaSilver p-2 focus:outline-none'
                  onChange={(e) => handleInput(e, 'date', index)}
                />
                {index === 0 ? (
                  <LuPlusCircle
                    size={24}
                    className='text-hanaSilver'
                    onClick={() => addInput()}
                  />
                ) : (
                  <LuMinusCircle
                    size={24}
                    className='text-hanaSilver'
                    onClick={() => deleteInput(item.id)}
                  />
                )}
              </p>
            </div>

            <div className='w-full flex items-center gap-3'>
              <p className='flex w-1/2 flex-col'>
                <span className={`font-hanaLight text-xs text-black/70 mb-1`}>
                  시작 시간
                </span>
                <input
                  type='time'
                  className='text-center rounded border-[0.7px] border-hanaSilver text-xs placeholder:text-hanaSilver p-2 focus:outline-none'
                  onBlur={(e) => handleInput(e, 'startTime', index)}
                />
              </p>
              <p className='flex w-1/2 flex-col'>
                <span className={`font-hanaLight text-xs text-black/70 mb-1`}>
                  종료 시간
                </span>
                <input
                  type='time'
                  className='text-center rounded border-[0.7px] border-hanaSilver text-xs placeholder:text-hanaSilver p-2 focus:outline-none'
                  onBlur={(e) => handleInput(e, 'endTime', index)}
                />
              </p>
            </div>
          </div>
        ))}
      </div>
    </AddLessonInputLabel>
  );
};
