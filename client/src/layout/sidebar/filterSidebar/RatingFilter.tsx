import CheckboxInput from '@/components/shared/inputs/Checkbox';
import RatingStar from '@/components/shared/rating';
import {RatingFilterProps} from '@/interfaces/shop';

const RatingFilter = ({ratings, handleRatingChange}: RatingFilterProps) => {
  return (
    <div className='flex flex-col justify-between hover:text-gray-800'>
      <div className='flex justify-between h-[40px] cursor-pointer hover:underline'>
        <h3 className='font-semibold pt-3 text-gray-600'>Rating:</h3>
      </div>

      <div className='my-5 flex flex-col gap-2'>
        {Array.from({length: 5}, (_, i) => 5 - i).map((num) => (
          <CheckboxInput
            key={num}
            label={<RatingStar readOnly={true} rating={num} width={140} />}
            checked={ratings.includes(num)}
            onChange={() => handleRatingChange(num)}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;
