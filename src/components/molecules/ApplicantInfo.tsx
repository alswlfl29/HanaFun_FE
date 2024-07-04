interface IProps {
  applicant: PeopleType;
}

export const ApplicantInfo = ({ applicant }: IProps) => {
  const time = applicant.startTime.substring(11, 16);
  return (
    <div className='flex justify-between font-hanaRegular p-1'>
      <div className='flex flex-row'>
        <p>{time}</p>
        <p className='ml-3'>{applicant.userName}</p>
      </div>
      <div>
        <p>{applicant.email}</p>
      </div>
    </div>
  );
};
