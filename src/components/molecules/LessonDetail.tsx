import { useState } from 'react';

interface Iprops {
  lessonDetail: BaseResponseType<LessonDetailType> | null | undefined;
}

export const LessonDetail = ({ lessonDetail }: Iprops) => {
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  const category = lessonDetail?.data?.categoryName;
  const people = lessonDetail?.data?.capacity;
  const price = lessonDetail?.data?.price;
  const place = lessonDetail?.data?.location;
  const materials = lessonDetail?.data?.materials;
  const description = lessonDetail?.data?.description;

  const toggleDescription = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('ko-KR').format(value);
  };

  return (
    <div className='mt-3 mb-32 px-5 py-3 w-[351px] font-hanaRegular text-xs bg-white rounded-2xl border-[1px] border-hanaSilver'>
      <div className='flex flex-row'>
        {lessonDetail?.data?.image ? (
          <img
            src={lessonDetail?.data?.image}
            alt=''
            className='w-[84px] h-[84px] rounded-xl mt-2'
          />
        ) : (
          <div className='w-[84px] h-[84px] rounded-xl mt-2 bg-gray-200'></div>
        )}

        <div className='ml-5'>
          <p>카테고리 : {category}</p>
          <p>모집 정원 : {people}명</p>
          <p>가격 : {formatNumber(Number(price) || 0)} 원</p>
          <p>장소 : {place}</p>
          <p>준비물 : {materials} </p>
          <p>
            상세설명 :{' '}
            {description && description.length > 20 && !isDescriptionExpanded
              ? `${description.substring(0, 15)} ...`
              : description}
            {description && description.length > 20 && (
              <button
                onClick={toggleDescription}
                className='text-hanaSilver ml-1'
              >
                {isDescriptionExpanded ? '접기' : '더보기'}
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
