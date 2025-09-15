'use client';
import Image from 'next/image';
import {FiTrash2} from 'react-icons/fi';
import ComponentLoader from '@/components/shared/loaders/ComponentLoader';
import RatingStar from '@/components/shared/rating';
import {ReviewIdProps} from '@/interfaces/reviews';
import {
  useDeleteReviewMutation,
  useFetchReviewsQuery,
} from '@/redux/slices/reviews/reviewsApi';

const Reviews = () => {
  const {data: reviewsList, isLoading} = useFetchReviewsQuery();

  const [deleteReview, {isLoading: isDeleteLoading}] =
    useDeleteReviewMutation();

  const onDelete = ({reviewId}: ReviewIdProps) => {
    deleteReview({_id: reviewId});
  };

  if (isLoading) return <ComponentLoader />;

  return (
    <div className='mx-auto px-14 py-8'>
      <h2 className='text-2xl font-semibold mb-4'>Manage Reviews</h2>
      <div className='grid grid-cols-3 gap-4'>
        {reviewsList?.map((review) => (
          <div
            className='flex flex-col gap-4 bg-gray-100 rounded-2xl p-5'
            key={review._id}
          >
            <div className='flex justify-between w-full'>
              <div className='flex gap-3 max-h-[45px] items-center'>
                <Image
                  src='/images/card_3.webp'
                  alt='profile'
                  height={45}
                  width={45}
                  className='rounded-full h-[45px] w-[45px]'
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

              <div
                className='cursor-pointer hover:scale-103'
                onClick={() => onDelete({reviewId: review._id})}
              >
                <FiTrash2 color='red' size={20} />
              </div>
            </div>
            <div>
              <h5 className='font-semibold text-lg'>{review.subject}</h5>
              <p className='break-words'>{review.comment}</p>
            </div>
          </div>
        ))}
        {reviewsList?.length === 0 && (
          <div className='w-full min-h-[70vh] flex-center col-span-3'>
            <p className='text-gray-500 font-semibold'>No reviews available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
