import {Swiper} from 'swiper/react';
import {SwiperProps} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CustomSwiper = ({children, ...props}: SwiperProps) => {
  return <Swiper {...props}>{children}</Swiper>;
};

export default CustomSwiper;
