interface IProps {
  applicant: PeopleType;
}

export const ApplicantInfo = ({ applicant }: IProps) => {
  const time = applicant.startTime.substring(11, 16);
  console.log(applicant);
  return (
    <div className='flex justify-between font-hanaRegular text-sm p-1 mt-[2px]'>
      <div className='flex flex-row'>
        <p>{time}</p>
        <p className='ml-3'>{applicant.userName}</p>
        <p className='ml-2'>{applicant.applicant}명</p>
      </div>
      <div>
        <p>{applicant.email}</p>
      </div>
    </div>
  );
};
