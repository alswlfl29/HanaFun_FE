interface Iprops {
  image: string;
  text: string;
  handleClick: () => {};
}

const DropdownSingle = ({ image, text, handleClick }: Iprops) => {
  return (
    <div
      className='w-20 h-8 p-1 rounded-lg flex items-center justify-between border-[1px] border-hanaSilver bg-white cursor-pointer'
      onClick={handleClick}
    >
      <img src={image} alt='image' className='w-3 h-3' />
      <p className='font-hanaRegular text-xs'>{text}</p>
    </div>
  );
};

export default DropdownSingle;
