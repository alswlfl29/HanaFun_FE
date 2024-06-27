import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { Button } from '../../components/common/Button';
import { useState } from 'react';

const infoHost = [
  {
    title: '호스트 등록',
    desc: `간편한 방법으로\n호스트가 되어보세요.`,
    image: 'images/openlesson1.gif',
  },
  {
    title: '클래스 개설 및 운영',
    desc: '진행할 클래스를 등록하고 운영해보세요.',
    image: 'images/openlesson2.gif',
  },
  {
    title: '정산 및 수익 관리',
    desc: `매 수업마다 정산을 받을 수 있어요.\n하나펀에서 제공하는\n월별 수익 관리를 받아보세요.`,
    image: 'images/openlesson3.gif',
  },
];

export const OpenLessonMain = () => {
  const navigate = useNavigate();
  const [isHost, setIsHost] = useState<boolean>(false);

  return (
    <>
      <Topbar title='클래스 개설' onClick={() => navigate('/')} />
      <div className='pt-5 px-5 mb-28'>
        <div className='relative flex items-center justify-between bg-hanaNavGreen px-6 rounded-2xl h-44 drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'>
          <div className='text-white font-hanaMedium text-base'>
            좋아하는 일<h1 className='text-2xl'>걱정없이 하세요.</h1>
            <div className='text-xs whitespace-pre-line mt-4 leading-relaxed'>
              당신의 재능을 마음껏 펼치세요.
              <p>
                수익은
                <span className='text-hanaGreen font-hanaBold'>
                  하나F<span className='text-hanaRed'>u</span>
                  <span className='text-hanaGold'>n</span>!
                </span>
                에서 관리해드립니다.
              </p>
            </div>
          </div>
          <img
            src='images/mascot3.svg'
            alt='별돌이'
            className='w-28 absolute bottom-0 right-4'
          />
        </div>
        <div className='mt-6 mb-16 px-6 py-8 flex flex-col items-center justify-between gap-10 bg-[#E6E6E7] rounded-2xl drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'>
          <h1 className='font-hanaMedium text-2xl'>
            <span className='text-hanaGreen font-hanaBold'>호스트</span>가 되는
            과정
          </h1>
          {infoHost.map((info, index) => (
            <div key={index} className='w-full'>
              {index !== 1 ? (
                <div className='flex justify-between items-center'>
                  <div className='flex flex-col justify-center gap-1'>
                    <h2 className='font-hanaBold text-xl'>{info.title}</h2>
                    <p className='font-hanaMedium text-xs text-black/70 whitespace-pre-line'>
                      {info.desc}
                    </p>
                  </div>
                  <img
                    src={info.image}
                    alt='클래스등록이미지'
                    className='w-24'
                  />
                </div>
              ) : (
                <div className='flex justify-between items-center'>
                  <img
                    src={info.image}
                    alt='클래스등록이미지'
                    className='w-24'
                  />
                  <div className='flex flex-col justify-center gap-1 text-right'>
                    <h2 className='font-hanaBold text-xl'>{info.title}</h2>
                    <p className='font-hanaMedium text-xs text-black/70 whitespace-pre-line'>
                      {info.desc}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <Button
          isActive={true}
          message='클래스 개설하기'
          onClick={() => {
            isHost
              ? navigate('/open-lesson/lesson')
              : navigate('/open-lesson/host');
          }}
        />
      </div>
    </>
  );
};