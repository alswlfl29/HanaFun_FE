import { FC, ReactNode } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface IProps {
  children: ReactNode;
}

export const Slide: FC<IProps> = ({ children }) => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    slidesToScroll: 1,
    draggable: true,
    arrows: false,
  };
  return (
    <Slider {...settings} className='w-full'>
      {children}
    </Slider>
  );
};
