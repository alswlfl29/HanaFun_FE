import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  lesson: SearchLessonResType;
}

export const LessonSearchCard: FC<IProps> = ({ lesson }) => {
  const navigate = useNavigate();

  return (
    <div
      className='bg-white flex justify-between p-3 rounded-2xl cursor-pointer drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
      onClick={() => navigate(`/lesson/${lesson.lessonId}`)}
    >
      <div className='w-36 h-36 rounded-xl overflow-hidden object-fill'>
        <img src={lesson.image} alt='lesson_image' className='w-full h-full' />
      </div>
      <div className='w-44 flex flex-col justify-between px-2'>
        <div>
          <h1 className='w-full font-hanaRegular text-base mb-1 break-all text-ellipsis line-clamp-2'>
            {lesson.title}
          </h1>
          <p className='font-hanaBold text-sm'>
            {lesson.price.toLocaleString()}원
          </p>
        </div>

        <div className='w-full'>
          <hr className='border-hanaSilver mb-2' />
          <div className='flex justify-between'>
            <p className='flex items-center gap-1 font-hanaRegular text-sm'>
              <img src='/images/logo.svg' alt='logo' className='w-7' />
              {lesson.hostName}
            </p>
            <p className='flex items-center font-hanaLight text-xs text-black/70'>
              참여자 {lesson.applicantSum}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
