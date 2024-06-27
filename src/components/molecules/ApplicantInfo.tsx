export const ApplicantInfo = () => {
  const time = '13:00';
  const name = '기쁨이';
  const email = 'alpaco1@naver.com';
  return (
    <div className='flex justify-between font-hanaRegular p-1'>
      <div className='flex flex-row'>
        <p>{time}</p>
        <p className='ml-3'>{name}</p>
      </div>
      <div>
        <p>{email}</p>
      </div>
    </div>
  );
};
