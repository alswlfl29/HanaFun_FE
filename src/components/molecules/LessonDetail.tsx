export const LessonDetail = () => {
  const category = '베이킹';
  const people = 3;
  const price = 30000;
  const place = '서울 성동구 연무장길';
  const materials = '건강한 신체';
  const description = '갱장한 클래스입니다. ';
  return (
    <div className='mt-3 mb-32 px-5 py-3 w-[351px] h-[122px] font-hanaRegular text-xs bg-white rounded-2xl border-[1px] border-hanaSilver'>
      <div className='flex flex-row'>
        <img
          src='/images/mypage/sample_lessoncard.png'
          alt='lessonImg'
          className='w-[84px] h-[84px] rounded-xl mt-2'
        />
        <div className='ml-5'>
          <p>카테고리 : {category}</p>
          <p>모집 정원 : {people}명</p>
          <p>가격 : {price}원</p>
          <p>장소 : {place}</p>
          <p>준비물 : {materials} </p>
          <p>상세설명 : {description}</p>
        </div>
      </div>
    </div>
  );
};