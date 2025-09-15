import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSelector} from 'react-redux';
import {getCurrentUser} from '@/redux/slices/users/usersSlice';
import {ProductPreviewIdProps} from '@/interfaces/shop';
import RatingStar from '@/components/shared/rating';
import {TextareaField} from '@/components/shared/inputs/Textarea';
import SubmitButton from '@/components/shared/buttons/SubmitButton';
import TextInput from '@/components/shared/inputs/TextInput';
import {reviewSchema} from '@/schemas/dashboard';
import {useAddReviewMutation} from '@/redux/slices/reviews/reviewsApi';
import {ReviewData} from '@/types/redux';
import ClipBtnLoader from '@/components/shared/loaders/ClipLoader';
import {socketService} from '@/utils/socketUtils';
import {useSendNotificationsMutation} from '@/redux/slices/notifications/notificationsApi';

const ReviewForm = ({productId}: ProductPreviewIdProps) => {
  const {control, handleSubmit, reset} = useForm<ReviewData>({
    defaultValues: {rating: 0, subject: '', comment: ''},
    resolver: yupResolver(reviewSchema),
  });

  const [addReview, {isLoading}] = useAddReviewMutation();
  const [notifyAdmin] = useSendNotificationsMutation();

  const user = useSelector(getCurrentUser);

  const onSubmit = (data: ReviewData) => {
    addReview({payload: {...data}, _id: productId});

    notifyAdmin({
      message: `A new review is submitted by user ${user?._id!} on product id ${productId}`,
      relatedId: productId,
      typeRef: 'Products',
      userId: user?._id!,
    });

    socketService.emitNewReview({
      userId: user?._id!,
      productId,
    });

    reset();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full md:w-[50%] flex flex-col gap-4 mt-8'
      >
        <h1 className='text-2xl sm:text-3xl text-primary font-semibold'>
          Review Product
        </h1>
        <RatingStar control={control} />

        <TextInput
          control={control}
          name='subject'
          type='text'
          label='Subject'
          className='rounded-[2px] h-[35px]'
        />

        <TextareaField
          control={control}
          placeholder='Enter your comment'
          label='Comment'
          name='comment'
          className='p-2'
        />

        <div className='flex-start w-full'>
          <SubmitButton
            buttonText={
              isLoading ? (
                <span>
                  <ClipBtnLoader />
                </span>
              ) : (
                'Submit Review'
              )
            }
            className='rounded-[4px] hover:bg-accent'
          />
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
