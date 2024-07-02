export const Loading = () => {
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <img src='/images/loading.gif' alt='' className='w-36 h-16 ml-6' />
      <div className='flex flex-row justify-center items-center text-3xl text-hanaNavGreen font-hanaBold'>
        <img src='/images/logo.svg' alt='' />
        <p className='ml-2 pt-2'>하나Fun!</p>
      </div>
    </div>
  );
};
