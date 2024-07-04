interface Iprops {
  image1: string;
  image2: string;
  text1: string;
  text2: string;
  handleClick1: () => void;
  handleClick2: () => void;
}

const DropdownDouble = ({
  image1,
  image2,
  text1,
  text2,
  handleClick1,
  handleClick2,
}: Iprops) => {
  return (
    <div className='w-20 h-[54px] px-2 py-[6px] bg-white border-[1px] border-hanaSilver rounded-xl'>
      <div
        className='flex justify-between border-b-[1px] border-hanaSilver mb-1 cursor-pointer'
        onClick={handleClick1}
      >
        <img src={image1} alt='' className='w-3 h-3 mt-[2px]' />
        <p className='font-hanaRegular text-xs mb-1'>{text1}</p>
      </div>
      <div
        className='flex justify-between cursor-pointer'
        onClick={handleClick2}
      >
        <img src={image2} alt='' className='w-3 h-3 mt-[1px]' />
        <p className='font-hanaRegular text-xs'>{text2}</p>
      </div>
    </div>
  );
};

export default DropdownDouble;
