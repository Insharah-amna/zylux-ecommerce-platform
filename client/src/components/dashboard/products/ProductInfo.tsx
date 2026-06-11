import {SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import {ProductInfoProps} from '@/interfaces/products';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import DisplayFields from './ProductsInfoContent';
import CustomSwiper from '@/components/shared/swiper';

const ProductInfo = ({selectedProduct, onCancel}: ProductInfoProps) => {
  return (
    <div className='space-y-2 text-sm w-[440px] m-auto'>
      <div className=' w-full flex pt-4 flex-col gap-4'>
        <DisplayFields label='Name' value={selectedProduct?.name} />
        <DisplayFields label='Price' value={selectedProduct?.price} />
        <DisplayFields
          label='Description'
          value={selectedProduct?.description}
        />
        <DisplayFields
          label='Category'
          value={selectedProduct?.categoryId?.name}
        />
        <DisplayFields
          label='Stock Status'
          value={
            selectedProduct?.isOutOfStock === true ? 'Out of stock' : 'In stock'
          }
        />
        <DisplayFields
          label='Discount'
          value={`${selectedProduct?.discount}%`}
        />
      </div>

      <div className='flex mt-2'>
        <p className='font-semibold w-1/2 pt-2'>Colors</p>

        <div className='w-1/2 flex gap-2 pt-2'>
          {selectedProduct?.colorVariants.map((color: string) => (
            <div
              key={color}
              className='w-6 h-6 rounded-sm border'
              style={{backgroundColor: color}}
              title={color}
            />
          ))}
        </div>
      </div>

      <p className='font-semibold my-3'>Images</p>

      <div className='flex h-[220px] w-full'>
        <CustomSwiper
          modules={[Pagination]}
          slidesPerView={1}
          pagination={{clickable: true}}
          className='max-w-md'
        >
          {selectedProduct?.imageUrls.map((url: string) => (
            <SwiperSlide key={url}>
              <img
                src={url}
                alt={`Product Image ${url}`}
                className='h-[220px] max-w-[440px] object-cover rounded mx-auto'
              />
            </SwiperSlide>
          ))}
        </CustomSwiper>
      </div>

      <div className='flex-center mt-6 max-w-[500px]'>
        <PrimaryButton
          buttonText='Close'
          className='h-[36px]'
          variant={'outline'}
          handleClick={onCancel}
        />
      </div>
    </div>
  );
};

export default ProductInfo;
