'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useState} from 'react';
import {SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import CustomSwiper from '@/components/shared/swiper';
import {HERO_SWIPER_CONTENT} from '@/constants/home';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';

const HeroSwiperContent = () => {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <>
      <CustomSwiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        navigation={{
          prevEl: '.swiper-button-prev-hero',
          nextEl: '.swiper-button-next-hero',
        }}
        loop={true}
        speed={1000}
        className='w-full bg-white md:bg-stone-100 relative'
      >
        <button
          onMouseEnter={() => setShowButtons(true)}
          onMouseLeave={() => setShowButtons(false)}
          className={`swiper-button-prev-hero cursor-pointer p-2 hover:bg-accent text-2xl md:text-4xl transition-all ease-in-out duration-200 absolute top-50 z-20 text-white bg-black/50 rounded-full ${showButtons ? 'left-10' : '-left-16'}`}
        >
          <FiChevronLeft />
        </button>

        {HERO_SWIPER_CONTENT.map(({title, description, button, image}) => (
          <SwiperSlide
            key={title}
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}
          >
            <div className='w-full h-[550px] flex flex-col-reverse md:flex-row'>
              <div className='md:w-2/5 flex flex-col gap-5 h-full px-5 justify-center'>
                <h1 className='text-3xl md:text-5xl font-semibold text-primary text-center md:text-start leading-snug'>
                  {title}
                </h1>

                <p className='text-lg text-primary text-center md:text-start'>
                  {description}
                </p>

                <div className='text-center md:text-start'>
                  <Link href={button.url}>
                    <PrimaryButton
                      buttonText={button.text}
                      className='rounded-full py-6 w-50 text-lg mt-3'
                    />
                  </Link>
                </div>
              </div>

              <div className='md:w-3/5 overflow-hidden h-[550px] flex items-center justify-center'>
                <Image
                  src={image.src}
                  alt={image.alt}
                  height={800}
                  width={800}
                  className='w-full h-auto object-cover'
                />
              </div>
            </div>
          </SwiperSlide>
        ))}

        <button
          onMouseEnter={() => setShowButtons(true)}
          onMouseLeave={() => setShowButtons(false)}
          className={`swiper-button-next-hero cursor-pointer p-2 hover:bg-accent text-2xl md:text-4xl transition-all ease-in-out duration-200 absolute top-50 z-20 text-white bg-black/50 rounded-full ${showButtons ? 'right-10' : '-right-16'}`}
        >
          <FiChevronRight />
        </button>
      </CustomSwiper>
    </>
  );
};

export default HeroSwiperContent;
