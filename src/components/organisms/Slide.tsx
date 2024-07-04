import { FC, ReactNode } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface IProps {
  children: ReactNode;
  settings: Settings;
  cssName: string;
}

export const Slide: FC<IProps> = ({ children, settings, cssName }) => {
  return (
    <Slider {...settings} className={`${cssName} w-screen max-w-[390px]`}>
      {children}
    </Slider>
  );
};
