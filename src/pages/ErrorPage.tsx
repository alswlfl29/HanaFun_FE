import { BiErrorCircle } from 'react-icons/bi';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col text-center justify-center items-center h-screen'>
      <BiErrorCircle className='text-hanaSilver w-20 h-20 mb-6' />
      <p className='font-hanaRegular text-2xl'>
        서비스 이용에 <br /> 불편을 드려 죄송합니다.
      </p>
      <p className='font-hanaLight text-hanaNavGray text-center mt-3'>
        이용하고자 하는 업무에 장애가 발생하였습니다. <br /> 잠시 후 다시
        시도하여 주시기 바랍니다.
      </p>
      <Button
        message='메인화면 이동'
        isActive={true}
        onClick={() => navigate('/')}
      />
    </div>
  );
};
