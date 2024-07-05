import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { Button } from '../../components/common/Button';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { CompleteSend } from '../../components/organisms/CompleteSend';
import { FaCamera } from 'react-icons/fa';
import { SelectAddress } from '../../components/molecules/SelectAddress';
import { ModalBottomContainer } from '../../components/organisms/ModalBottomContainer';
import { AddLessonInputLabel } from '../../components/Atom/AddLessonInputLabel';
import { AddLessonInput } from '../../components/molecules/AddLessonInput';
import { AddLessonMaterialList } from '../../components/molecules/AddLessonMaterialList';
import { AddLessonTimeList } from '../../components/molecules/AddLessonTimeList';
import { ChoiceInput } from '../../components/molecules/ChoiceInput';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { ImageApiClient } from '../../apis/imageApiClient';

export const RegisterLesson = () => {
  const navigate = useNavigate();
  const [isBtnActive, setIsBtnActive] = useState<boolean>(false);
  const [isSend, setIsSend] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [file, setFile] = useState<File>();
  const [uploadImageUrl, setUploadImageUrl] = useState<string | null>(null);
  const inputTitle = useRef<HTMLInputElement | null>(null);
  const [category, setCategory] = useState<CategoryType>();
  const [address, setAddress] = useState<string>('');
  const inputCapacity = useRef<HTMLInputElement | null>(null);
  const inputPrice = useRef<HTMLInputElement | null>(null);
  const [lessonTime, setLessonTime] = useState<LessonDateCommonType[]>([]);
  const [materials, setMaterials] = useState<string>('');
  const inputDetailInfo = useRef<HTMLTextAreaElement | null>(null);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      const res = ApiClient.getInstance().getCategoryList();
      return res;
    },
    staleTime: 100000,
  });

  const { mutate: postImage } = useMutation({
    mutationFn: (formData: FormData) => {
      const res = ImageApiClient.getImageInstance().postLessonImg(formData);
      return res;
    },
    onSuccess: (data) => {
      if (
        category &&
        inputTitle.current?.value &&
        inputPrice.current?.value &&
        inputCapacity.current?.value &&
        inputDetailInfo.current?.value
      ) {
        postCreateLesson({
          categoryId: category?.categoryId,
          title: inputTitle.current?.value,
          location: address,
          price: +inputPrice.current?.value,
          capacity: +inputCapacity.current?.value,
          image: data,
          description: inputDetailInfo.current?.value,
          materials: materials,
          lessonDate: lessonTime,
        });
      }
    },
  });

  const { mutate: postCreateLesson } = useMutation({
    mutationFn: (reqData: CreateLessonReqType) => {
      const res = ApiClient.getInstance().postCreateLesson(reqData);
      return res;
    },
    onSuccess: () => setIsSend(true),
  });

  const onChangeUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setUploadImageUrl(imageUrl);
    }
  };

  const onChangeCategory = (category: CategoryType) => {
    setCategory(category);
    setShowModal(false);
  };

  const onChangeLessonTime = (lessontime: LessonDateCommonType[]) => {
    setLessonTime(lessontime);
  };

  const onChangeMaterials = (materials: string) => {
    setMaterials(materials);
  };

  const onChangeAddress = (address: string) => {
    if (address && address.length !== 1) {
      setAddress(address);
    }
  };

  const checkValid = () => {
    if (
      !file ||
      inputTitle.current?.value === '' ||
      !category ||
      inputCapacity.current?.value === '' ||
      inputPrice.current?.value === '' ||
      // lessonTime === 0 ||
      address === '' ||
      inputDetailInfo.current?.value === ''
    ) {
      setIsBtnActive(false);
      return;
    }
    if (inputPrice.current && +inputPrice.current.value < 0) {
      setIsBtnActive(false);
      return;
    }
    if (inputCapacity.current && +inputCapacity.current.value <= 0) {
      setIsBtnActive(false);
      return;
    }
    setIsBtnActive(true);
  };

  const handlePostAddLesson = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      postImage(formData);
    }
  };

  useEffect(() => {
    checkValid();
  }, [file, category, lessonTime, materials, address]);

  return (
    <>
      {categories?.data && showModal && (
        <ModalBottomContainer
          color='#FFFFFF'
          onClose={() => setShowModal(false)}
        >
          <h3 className='font-hanaBold text-lg'>카테고리 선택</h3>
          <div className='w-full'>
            <hr />
            <div className='max-h-60 overflow-y-auto scrollbar-hide px-6 py-2'>
              {categories?.data.map((category, idx) => (
                <div key={category.categoryId}>
                  <p
                    className='py-2 font-hanaRegular text-base cursor-pointer pl-1'
                    onClick={() => onChangeCategory(category)}
                  >
                    {category.categoryName}
                  </p>
                  {idx + 1 !== categories.data?.length && <hr />}
                </div>
              ))}
            </div>
          </div>
        </ModalBottomContainer>
      )}
      <Topbar title='클래스 등록' onClick={() => navigate('/open-lesson')} />
      {!isSend ? (
        <div className='pt-5 pb-24 flex flex-col'>
          <AddLessonInputLabel title='사진'>
            <input
              id='imgUploadInput'
              type='file'
              accept='.png, .jpeg, .jpg'
              onChange={onChangeUploadImage}
              className='hidden'
            />
            <label htmlFor='imgUploadInput' className='overflow-hidden'>
              {uploadImageUrl ? (
                <img
                  src={uploadImageUrl}
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
            onChange={() => checkValid()}
            ref={inputTitle}
          />
          <div className='mb-5 px-5'>
            <h1 className='font-hanaBold text-lg flex items-end mb-1'>
              카테고리
            </h1>
            <ChoiceInput
              isChoice={!!category}
              content={
                category ? category?.categoryName : '카테고리를 선택해주세요'
              }
              openModal={() => setShowModal(true)}
            />
          </div>
          <AddLessonInput
            type='number'
            title='모집인원'
            placeholder='모집인원을 입력해주세요.'
            onChange={() => checkValid()}
            ref={inputCapacity}
          />
          <AddLessonInput
            type='number'
            title='가격'
            placeholder='가격을 입력해주세요.'
            onChange={() => checkValid()}
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
              onChange={() => checkValid()}
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
          !isSend
            ? handlePostAddLesson()
            : navigate('/mypage/host', {
                replace: true,
              });
        }}
      />
    </>
  );
};
