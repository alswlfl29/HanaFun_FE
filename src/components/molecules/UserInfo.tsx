interface IProps {
  username: string;
  hanaMoney?: number;
}

export const UserInfo = ({ username, hanaMoney }: IProps) => {
  return (
    <div className='w-[350px] h-[62px] p-5 flex justify-between items-center bg-white rounded-2xl mt-5'>
      <p className='font-hanaMedium text-xl justify-center'>{username}님</p>
      <div className='flex justify-between items-center'>
        <img
          src='../images/mypage/hanamoney_logo.png'
          alt='logo'
          className='w-10 h-10'
        />
        <p className='font-hanaMedium text-xl text-hanaNavGreen pl-1'>
          {hanaMoney}
        </p>
      </div>
    </div>
  );
};
