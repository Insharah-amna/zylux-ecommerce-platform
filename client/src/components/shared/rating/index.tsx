import {Controller} from 'react-hook-form';
import {Rating, StickerStar} from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import {RatingStarProps} from '@/interfaces/reviews';
import ErrorMessage from '@/components/shared/inputs/ErrorMessage';

export default function RatingStar({
  control,
  width = 170,
  rating,
  readOnly,
}: RatingStarProps) {
  const StarStyles = {
    itemShapes: StickerStar,
    activeFillColor: '#ffb700',
    inactiveFillColor: '#fdf189',
  };

  if (readOnly) {
    return (
      <Rating
        style={{maxWidth: width}}
        value={rating || 0}
        itemStyles={StarStyles}
        readOnly
      />
    );
  }

  return (
    <Controller
      name='rating'
      control={control}
      render={({field, fieldState: {error}}) => (
        <>
          <Rating
            {...field}
            style={{maxWidth: width}}
            value={field.value}
            onChange={field.onChange}
            itemStyles={StarStyles}
          />
          {error && <ErrorMessage errorMessage={error.message} />}
        </>
      )}
    />
  );
}
