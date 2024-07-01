import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { Button } from '../../components/common/Button';
import { ChangeEvent, useRef, useState } from 'react';
import { CompleteSend } from '../../components/organisms/CompleteSend';
import { FaCamera } from 'react-icons/fa';
import { SelectAddress } from '../../components/molecules/SelectAddress';
import { ModalBottomContainer } from '../../components/organisms/ModalBottomContainer';
import { AddLessonInputLabel } from '../../components/Atom/AddLessonInputLabel';
import { AddLessonInput } from '../../components/molecules/AddLessonInput';
import { AddLessonMaterialList } from '../../components/molecules/AddLessonMaterialList';
import { AddLessonTimeList } from '../../components/molecules/AddLessonTimeList';
import { ChoiceInput } from '../../components/molecules/ChoiceInput';

export const categories = [
  '요리',
  '여행',
  '스포츠',
  '예술',
  '심리상담',
  '재테크',
  '자기계발',
  '뷰티',
];

export type LessonTime = {
  date: Date;
  startTime: number;
  endTime: number;
};

export const RegisterLesson = () => {
  const navigate = useNavigate();
  const [isBtnActive, setIsBtnActive] = useState<boolean>(false);
  const [isSend, setIsSend] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [uploadImageFile, setUploadImageFile] = useState<string | null>(null);
  const inputTitle = useRef<HTMLInputElement | null>(null);
  const [category, setCategory] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const inputCapacity = useRef<HTMLInputElement | null>(null);
  const inputPrice = useRef<HTMLInputElement | null>(null);
  const [lessonTime, setLessonTime] = useState<LessonTime[]>([]);
  const [materials, setMaterials] = useState<string>('');
  const inputDetailInfo = useRef<HTMLTextAreaElement | null>(null);

  const onChangeUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setUploadImageFile(imageUrl);
      checkValid();
      // const formData = new FormData();
      // if (file) {
      //   formData.append('file', file);
      //   console.log('formData>>', formData);
      // }
    }
  };

  const onChangeCategory = (category: string) => {
    setCategory(category);
    setShowModal(false);
    checkValid();
  };

  const onChangeLessonTime = (lessontime: LessonTime[]) => {
    setLessonTime(lessontime);
    checkValid();
  };

  const onChangeMaterials = (materials: string) => {
    setMaterials(materials);
    checkValid();
  };

  const onChangeAddress = (address: string) => {
    if (address && address.length !== 1) {
      setAddress(address);
      checkValid();
    }
  };

  const checkValid = () => {
    if (
      !uploadImageFile ||
      inputTitle.current?.value === '' ||
      category === '' ||
      inputCapacity.current?.value === '' ||
      inputPrice.current?.value === '' ||
      lessonTime.length === 0 ||
      address === '' ||
      inputDetailInfo.current?.value === ''
    ) {
      setIsBtnActive(false);
      return;
    }

    setIsBtnActive(true);
  };

  const handlePostAddLesson = () => {
    console.log('사진>>', uploadImageFile);
    console.log('강좌명>>', inputTitle.current?.value);
    console.log('카테고리>>', category);
    console.log('모집인원>>', inputCapacity.current?.value);
    console.log('가격>>', inputPrice.current?.value);
    console.log('클래스 일정>>', lessonTime);
    console.log('장소>>', address);
    console.log('준비물>>', materials);
    console.log('상세설명>>', inputDetailInfo.current?.value);
    setIsSend(true);
  };

  return (
    <>
      {showModal && (
        <ModalBottomContainer
          color='#FFFFFF'
          onClose={() => setShowModal(false)}
        >
          <h3 className='font-hanaBold text-lg'>카테고리 선택</h3>
          <div className='w-full'>
            <hr />
            <div className='max-h-60 overflow-y-auto scrollbar-hide px-6 py-2'>
              {categories.map((category, idx) => (
                <div key={idx}>
                  <p
                    className='py-2 font-hanaRegular text-base cursor-pointer pl-1'
                    onClick={() => onChangeCategory(category)}
                  >
                    {category}
                  </p>
                  {idx !== categories.length - 1 && <hr />}
                </div>
              ))}
            </div>
          </div>
        </ModalBottomContainer>
      )}
      <Topbar title='클래스 등록' onClick={() => navigate('/open-lesson')} />
      {!isSend ? (
        <div className='pt-5 px-5 pb-24 flex flex-col'>
          <AddLessonInputLabel title='사진'>
            <input
              id='imgUploadInput'
              type='file'
              accept='.png, .jpeg, .jpg'
              onChange={onChangeUploadImage}
              className='hidden'
            />
            <label htmlFor='imgUploadInput' className='overflow-hidden'>
              {uploadImageFile ? (
                <img
                  src={uploadImageFile}
                  alt='클래스 이미지'
                  className='w-24 h-24 rounded-lg object-fill drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'
                />
              ) : (
                <div className='w-24 h-24 text-hanaSilver text-xs flex flex-col justify-center items-center rounded-lg bg-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.15)]'>
                  <FaCamera size={24} className='mb-0.5' />
                  사진 업로드
                </div>
              )}
            </label>
          </AddLessonInputLabel>
          <AddLessonInput
            type='text'
            title='강좌명'
            placeholder='강좌명을 입력해주세요.(최대 50자)'
            onChange={checkValid}
            ref={inputTitle}
          />

          <div className='mb-5'>
            <h1 className='font-hanaBold text-lg flex items-end mb-1'>
              카테고리
            </h1>
            <ChoiceInput
              isChoice={category !== ''}
              content={category !== '' ? category : '카테고리를 선택해주세요'}
              openModal={() => setShowModal(true)}
            />
          </div>
          <AddLessonInput
            type='number'
            title='모집인원'
            placeholder='모집인원을 입력해주세요.'
            onChange={checkValid}
            ref={inputCapacity}
          />
          <AddLessonInput
            type='number'
            title='가격'
            placeholder='가격을 입력해주세요.'
            onChange={checkValid}
            ref={inputPrice}
          />
          <AddLessonTimeList onChangeTimes={onChangeLessonTime} />
          <SelectAddress onChangeAddress={onChangeAddress} />
          <AddLessonMaterialList onChangeMaterials={onChangeMaterials} />
          <AddLessonInputLabel title='상세 설명'>
            <textarea
              ref={inputDetailInfo}
              placeholder='상세 설명을 입력해주세요. (200자 이내)'
              maxLength={200}
              onChange={checkValid}
              className='w-full h-36 rounded-md border-[0.7px] border-hanaSilver text-xs placeholder:text-hanaSilver p-3 focus:outline-none'
            ></textarea>
          </AddLessonInputLabel>
        </div>
      ) : (
        <CompleteSend title2='클래스 등록이 완료되었습니다!' />
      )}
      <Button
        message={!isSend ? '등록' : '완료'}
        isActive={isBtnActive}
        onClick={() => {
          !isSend ? handlePostAddLesson() : navigate('/mypage');
        }}
      />
    </>
  );
};
