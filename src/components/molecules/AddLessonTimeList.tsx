import { FC, useEffect, useRef, useState } from 'react';
import { LuMinusCircle, LuPlusCircle } from 'react-icons/lu';
import { AddLessonInputLabel } from '../Atom/AddLessonInputLabel';
import { format } from 'date-fns';
import { LessonTime } from '../../pages/openLesson/RegisterLesson';

interface IProps {
  onChangeTimes: (lessontime: LessonTime[]) => void;
}

type timeType = {
  id: number;
  date: Date | null;
  startTime: number | null;
  endTime: number | null;
};

export const AddLessonTimeList: FC<IProps> = ({ onChangeTimes }) => {
  const inputTimeNextID = useRef<number>(1);
  const [inputTimeItems, setInputTimeItems] = useState<timeType[]>([
    {
      id: 0,
      date: null,
      startTime: null,
      endTime: null,
    },
  ]);

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

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
    index: number
  ) => {
    if (index > inputTimeItems.length) return;
    const inputItemsCopy = JSON.parse(JSON.stringify(inputTimeItems));
    inputItemsCopy[index][name] = e.target.value;
    setInputTimeItems(inputItemsCopy);
  };

  const handlechangeTimes = () => {
    let datetime: LessonTime[] = [];
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
                  placeholder='클래스 날짜'
                  min={format(
                    new Date(new Date().setDate(new Date().getDate())),
                    'yyyy-MM-dd'
                  )}
                  className='w-full text-center rounded border-[0.7px] border-hanaSilver text-xs placeholder:text-hanaSilver p-2 focus:outline-none'
                  onBlur={(e) => handleInput(e, 'date', index)}
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
