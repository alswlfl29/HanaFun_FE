import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { CategoryItem } from '../../components/Atom/CategoryItem';
import { categories } from '../openLesson/RegisterLesson';
import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { TbArrowsSort } from 'react-icons/tb';
import { LessonSearchCard } from '../../components/molecules/LessonSearchCard';

const data = [
  {
    lesson_id: 5,
    image: 'https://picsum.photos/200/200',
    title: 'fdafasdffdafasdffdafasdffdafasdf',
    price: 60000,
    host_name: '김헨리',
  },
  {
    lesson_id: 6,
    image: 'https://picsum.photos/200/200',
    title: 'dccccvdfac',
    price: 30000,
    host_name: '김하나',
  },
  {
    lesson_id: 7,
    image: 'https://picsum.photos/200/200',
    title: 'dccc',
    price: 30000,
    host_name: '김하나',
  },
  {
    lesson_id: 8,
    image: 'https://picsum.photos/200/200',
    title: 'sfaa',
    price: 30000,
    host_name: '김하나',
  },
];

const sortCategories = ['날짜순', '인기순', '저가순', '고가순'];

export const LessonSearch = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);
  const [selectedSort, setSelectedSort] = useState<string>(sortCategories[0]);
  const [showSortBtn, setShowSortBtn] = useState<boolean>(false);

  const handleClickedCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleClickedSort = (sortName: string) => {
    setSelectedSort(sortName);
    setShowSortBtn(false);
  };
  return (
    <div className='w-full mb-32'>
      <Topbar title='원데이 클래스' onClick={() => navigate(-1)} />
      <div className='flex gap-3 mt-6 px-5 whitespace-nowrap overflow-x-auto scrollbar-hide'>
        <CategoryItem
          id={-1}
          name='전체'
          bgColor={selectedCategory === -1 ? '#252B45' : '#D9D9D9'}
          textColor={selectedCategory === -1 ? 'white' : 'black'}
          onClick={handleClickedCategory}
        />
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            id={index}
            name={category}
            bgColor={selectedCategory === index ? '#252B45' : '#D9D9D9'}
            textColor={selectedCategory === index ? 'white' : 'black'}
            onClick={handleClickedCategory}
          />
        ))}
      </div>
      <div className='relative flex items-center px-5 w-full mt-4'>
        <IoIosSearch
          size={32}
          color='#27bb9e'
          className='absolute right-7 cursor-pointer drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]'
        />
        <input
          type='text'
          className='w-full rounded-[0.85rem] py-2.5 px-3 border-2 border-hanaNavGreen focus:outline-hanaGreen'
        />
      </div>
      <div className='flex justify-between px-5 mt-5 font-hanaMedium text-base'>
        <p>검색결과 {data.length}건</p>
        <button
          className='relative flex items-center text-hanaSilver'
          onClick={() => setShowSortBtn((prev) => !prev)}
        >
          <TbArrowsSort size={22} />
          {selectedSort}
        </button>
        {showSortBtn && (
          <div className='absolute z-10 flex flex-col justify-center items-center w-16 bg-white top-56 right-5 border-[0.1rem] border-black/50'>
            {sortCategories.map((sort, index) => (
              <div key={index} className='flex flex-col'>
                <p
                  className='text-black/50 font-hanaRegular text-sm py-1 px-2 cursor-pointer'
                  onClick={() => handleClickedSort(sort)}
                >
                  {sort}
                </p>
                {index !== sortCategories.length - 1 && <hr />}
              </div>
            ))}
          </div>
        )}
      </div>
      <hr className='mx-5 mt-2 border-hanaSilver' />
      <div className='px-5 py-4 flex flex-col gap-4'>
        {data.map((data) => (
          <LessonSearchCard key={data.lesson_id} lesson={data} />
        ))}
      </div>
    </div>
  );
};
