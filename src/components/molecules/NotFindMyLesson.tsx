import { useNavigate } from 'react-router-dom';

export const NotFindMyLesson = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/search'); // 클래스 탐색 탭으로 이동
  };
  return (
    <div className='font-hanaRegular text-center mt-14'>
      <p className='text-base'>신청한 클래스가 없습니다</p>
      <p
        className='text-xs text-hanaSilver underline mt-7 cursor-pointer'
        onClick={handleNavigate}
      >
        클래스 보러가기
      </p>
    </div>
  );
};
