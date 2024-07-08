import { ApplicantInfo } from '../molecules/ApplicantInfo';
interface IProps {
  applicants: PeopleListType | null;
}

export const ApplicantList = ({ applicants }: IProps) => {
  return (
    <div>
      <div className='font-hanaMedium flex justify-between text-lg mt-5 '>
        <p className='ml-1'>예약자 정보</p>
        <p>
          {applicants?.people.length}/{applicants?.capacity} 명
        </p>
      </div>

      <div className='w-[351px] h-[118px] bg-white border-[1px] mt-3 px-6 py-3 border-hanaSilver rounded-xl overflow-y-scroll scrollbar-hide'>
        {applicants?.people?.map((applicant, index) => (
          <ApplicantInfo key={index} applicant={applicant} />
        ))}
      </div>
    </div>
  );
};
