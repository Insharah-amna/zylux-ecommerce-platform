import {SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import {useFetchReviewsByProductIdQuery} from '@/redux/slices/reviews/reviewsApi';
import {ProductPreviewIdProps} from '@/interfaces/shop';
import {GetReviewItemsResponse} from '@/interfaces/redux';
import ComponentLoader from '@/components/shared/loaders/ComponentLoader';
import RatingStar from '@/components/shared/rating';
import CustomSwiper from '@/components/shared/swiper';
import NoReviews from './NoReviews';

const ReviewCard = ({productId}: ProductPreviewIdProps) => {
  const {data: reviewsList, isLoading} = useFetchReviewsByProductIdQuery({
    productId,
  });

  if (isLoading) return <ComponentLoader />;

  if (reviewsList?.length === 0) return <NoReviews />;

  return (
    <>
      <div className='grid grid-flow-col gap-5 mt-5'>
        <CustomSwiper
          modules={[Pagination]}
          speed={800}
          className='w-full review-cards-swiper'
          pagination={{clickable: true}}
          spaceBetween={12}
          breakpoints={{
            300: {slidesPerView: 1},
            500: {slidesPerView: 2},
            800: {slidesPerView: 3},
            1024: {slidesPerView: 5},
          }}
        >
          {reviewsList?.map((review: GetReviewItemsResponse) => (
            <SwiperSlide className='py-8'>
              <div
                className='flex flex-col gap-4 bg-gray-100 rounded-2xl p-5'
                key={`${review.subject}${review.userId._id}`}
              >
                <div className='flex gap-3'>
                  <img
                    src='/images/card_3.webp'
                    alt='profile'
                    className='rounded-full h-[50px] w-[50px]'
                  />

                  <div className='flex flex-col gap-1'>
                    <h1 className='text-lg font-semibold'>
                      {review.userId.firstName}
                    </h1>

                    <RatingStar
                      rating={review.rating}
                      readOnly={true}
                      width={100}
                    />
                  </div>
                </div>
                <div>
                  <h5 className='font-semibold text-lg'>{review.subject}</h5>
                  <p className='break-words line-clamp-3'>{review.comment}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </CustomSwiper>
      </div>
    </>
  );
};

export default ReviewCard;
