import { ApplicantInfo } from '../molecules/ApplicantInfo';

export const ApplicantList = () => {
  const capacity = 3;
  return (
    <div>
      <div className='font-hanaMedium flex justify-between text-lg mt-5 '>
        <p className='ml-1'>예약자 정보</p>
        <p>{capacity} 명</p>
      </div>

      <div className='w-[351px] h-[118px] bg-white border-[1px] mt-3 px-6 py-3 border-hanaSilver rounded-xl overflow-y-scroll scrollbar-hide'>
        <ApplicantInfo />
        <ApplicantInfo />
        <ApplicantInfo />
        <ApplicantInfo />
      </div>
    </div>
  );
};
