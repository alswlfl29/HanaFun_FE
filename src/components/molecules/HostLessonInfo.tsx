import { GrFormNext } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

export const HostLessonInfo = ({ lessonId, image, title }: HostLessonType) => {
  const navigate = useNavigate();

  return (
    <div
      className=' w-[351px] h-[70px] bg-white shadow-md rounded-2xl mt-3 p-3 flex justify-between items-center font-hanaRegular text-xl cursor-pointer'
      onClick={() => navigate(`/mypage/host/lesson-calendar/${lessonId}`)}
    >
      <div className='flex flex-row items-center'>
        <img src={image} alt='' className='w-11 h-11 rounded-lg mr-7' />
        <p>{title}</p>
      </div>
      <GrFormNext className='text-hanaSilver' />
    </div>
  );
};
