import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { CategoryItem } from '../../components/Atom/CategoryItem';
import { useEffect, useRef, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { TbArrowsSort } from 'react-icons/tb';
import { LessonSearchCard } from '../../components/molecules/LessonSearchCard';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { Loading } from '../Loading';
import { SortCategories, SortType } from '../../constants/sortList';

export const Lessondata = [
  {
    lesson_id: 5,
    image: 'https://picsum.photos/200/200',
    title: '맛있는 치즈케이크 만들기',
    price: 60000,
    host_name: '김헨리',
  },
  {
    lesson_id: 6,
    image: 'https://picsum.photos/200/200',
    title: '수제 캔들 만들기',
    price: 30000,
    host_name: '김하나',
  },
  {
    lesson_id: 7,
    image: 'https://picsum.photos/200/200',
    title: '클라이밍 배우기',
    price: 30000,
    host_name: '홍길동',
  },
  {
    lesson_id: 8,
    image: 'https://picsum.photos/200/200',
    title: '재미있는 재테크',
    price: 30000,
    host_name: '별돌이',
  },
];

export const LessonSearch = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);
  const [selectedSort, setSelectedSort] = useState<SortType>(SortCategories[0]);
  const [showSortBtn, setShowSortBtn] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [items, setItems] = useState<SearchLessonResType[]>([]);

  const handleClickedCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleClickedSort = (sort: SortType) => {
    setSelectedSort(sort);
    setShowSortBtn(false);
  };

  const { isLoading: isGetCategoryList, data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      const res = ApiClient.getInstance().getCategoryList();
      return res;
    },
    staleTime: 100000,
  });

  const { isLoading: isGetLessonLoading, data: lessonList } = useQuery({
    queryKey: ['lessonList', selectedSort, searchText],
    queryFn: () => {
      const res = ApiClient.getInstance().getSearchLessonAll({
        query: searchText,
        sort: selectedSort.sort,
      });
      return res;
    },
    staleTime: 10000,
    enabled: selectedCategory === -1,
  });

  const { isLoading: isGetLessonCategoryLoading, data: lessonListByCategory } =
    useQuery({
      queryKey: [
        'lessonListByCategory',
        selectedCategory,
        selectedSort,
        searchText,
      ],
      queryFn: () => {
        const res = ApiClient.getInstance().getSearchLessonCategory(
          selectedCategory,
          {
            query: searchText,
            sort: selectedSort.sort,
          }
        );
        return res;
      },
      staleTime: 10000,
      enabled: selectedCategory !== -1,
    });

  const handleSearchInput = () => {
    if (inputRef.current) setSearchText(inputRef.current.value);
  };

  useEffect(() => {
    if (lessonList?.data && selectedCategory === -1) setItems(lessonList.data);
    if (lessonListByCategory?.data && selectedCategory !== -1)
      setItems(lessonListByCategory.data);
  }, [lessonList?.data, lessonListByCategory?.data]);

  if (isGetCategoryList || isGetLessonLoading || isGetLessonCategoryLoading)
    return <Loading />;

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
        {categories?.data &&
          categories?.data.map((category) => (
            <CategoryItem
              key={category.categoryId}
              id={category.categoryId}
              name={category.categoryName}
              bgColor={
                selectedCategory === category.categoryId ? '#252B45' : '#D9D9D9'
              }
              textColor={
                selectedCategory === category.categoryId ? 'white' : 'black'
              }
              onClick={handleClickedCategory}
            />
          ))}
      </div>
      <div className='relative flex items-center px-5 w-full mt-4'>
        <IoIosSearch
          size={32}
          color='#27bb9e'
          className='absolute right-7 cursor-pointer drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]'
          onClick={handleSearchInput}
        />
        <input
          type='text'
          ref={inputRef}
          defaultValue={searchText}
          className='w-full rounded-[0.85rem] py-2.5 px-3 border-2 border-hanaNavGreen focus:outline-hanaGreen'
        />
      </div>
      <div className='flex justify-between px-5 mt-5 font-hanaMedium text-base'>
        <p>검색결과 {items.length}건</p>
        <button
          className='relative flex items-center text-hanaSilver'
          onClick={() => setShowSortBtn((prev) => !prev)}
        >
          <TbArrowsSort size={22} />
          {selectedSort.name}
        </button>
        {showSortBtn && (
          <div className='absolute z-10 flex flex-col justify-center items-center w-16 bg-white top-56 right-5 border-[0.1rem] border-black/50'>
            {SortCategories.map((sort, index) => (
              <div key={index} className='flex flex-col'>
                <p
                  className='text-black/50 font-hanaRegular text-sm py-1 px-2 cursor-pointer'
                  onClick={() => handleClickedSort(sort)}
                >
                  {sort.name}
                </p>
                {index !== SortCategories.length - 1 && <hr />}
              </div>
            ))}
          </div>
        )}
      </div>
      <hr className='mx-5 mt-2 border-hanaSilver' />
      <div className='px-5 py-4 flex flex-col gap-4'>
        {items.map((item) => (
          <LessonSearchCard key={item.lessonId} lesson={item} />
        ))}
      </div>
    </div>
  );
};
