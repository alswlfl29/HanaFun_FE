import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { HostLessonSlider } from '../../components/organisms/HostLessonSlider';
import { SalesCard } from '../../components/molecules/SalesCard';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';

export const HostPage = () => {
  const navigate = useNavigate();

  const { data: hostLessons } = useQuery({
    queryKey: ['hostLessons'],
    queryFn: async () => {
      const response = await ApiClient.getHostLesson();
      return response;
    },
  });

  console.log(hostLessons);

  return (
    <div>
      <Topbar title='개설 클래스 관리' onClick={() => navigate('/mypage')} />
      <p className='font-hanaRegular text-xl mt-6 ml-6'>개설 클래스 목록</p>
      <HostLessonSlider data={hostLessons} />
      <p className='font-hanaRegular text-xl mt-10 ml-6'>매출 관리</p>
      <div className='flex justify-center'>
        <SalesCard />
      </div>
    </div>
  );
};
