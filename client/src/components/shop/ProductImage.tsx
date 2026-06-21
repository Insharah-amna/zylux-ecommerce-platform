import Image from 'next/image';
import {SwiperSlide} from 'swiper/react';
import CustomSwiper from '@/components/shared/swiper';
import {ProductImageProps} from '@/interfaces/shop';

const ProductImage = ({
  product,
  showProductImage,
  setShowProductImage,
}: ProductImageProps) => {
  return (
    <div className='w-full md:w-1/2 flex-end md:sticky flex flex-col gap-5'>
      <div className='h-[300px] sm:h-[500px] overflow-hidden flex-center w-full'>
        {showProductImage && (
          <Image
            src={showProductImage}
            alt={product.name}
            height={500}
            width={500}
            className='bg-cover w-full'
          />
        )}
      </div>

      <CustomSwiper
        speed={800}
        className='w-full relative'
        breakpoints={{
          300: {slidesPerView: 2},
          500: {slidesPerView: 3},
          1024: {slidesPerView: 5},
        }}
        spaceBetween={10}
      >
        {product.imageUrls.map((url) => (
          <SwiperSlide style={{width: '100px'}} key={url}>
            <div
              className={`relative overflow-hidden w-[60px] sm:w-[100px] h-[60px] sm:h-[100px] flex-center border rounded-md cursor-pointer ${
                showProductImage === url ? 'border-2 border-accent' : ''
              }`}
            >
              <button onClick={() => setShowProductImage(url)}>
                <Image
                  src={url}
                  alt={product.name}
                  fill
                  sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
                  className='w-full h-auto object-cover cursor-pointer'
                />
              </button>
            </div>
          </SwiperSlide>
        ))}
      </CustomSwiper>
    </div>
  );
};

export default ProductImage;
