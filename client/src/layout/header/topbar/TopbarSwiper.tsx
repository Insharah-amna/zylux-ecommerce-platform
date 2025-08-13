import {SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import CustomSwiper from '@/components/shared/swiper';
import {HOME_SWIPER_CONTENT} from '@/constants/home';

const TopbarSwiper = () => {
  return (
    <div className='flex gap-5 font-semibold justify-between text-center h-7 w-full md:w-125'>
      <button className='swiper-button-prev-custom cursor-pointer text-gray-300 hover:text-gray-50 text-2xl transition-colors ease-in-out duration-200'>
        <FiChevronLeft />
      </button>

      <CustomSwiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        loop={true}
        speed={1000}
        className='max-w-md text-md'
      >
        {HOME_SWIPER_CONTENT.map(({label}, index) => (
          <SwiperSlide key={index}>
            <p>{label}</p>
          </SwiperSlide>
        ))}
      </CustomSwiper>

      <button className='swiper-button-next-custom cursor-pointer text-gray-300 hover:text-gray-50 text-2xl transition-colors ease-in-out duration-200'>
        <FiChevronRight />
      </button>
    </div>
  );
};

export default TopbarSwiper;
