import {FiEye, FiTrash} from 'react-icons/fi';
import {TableCell, TableRow} from '@/components/ui/table';
import {ReviewRowProps} from '@/interfaces/reviews';

const ReviewRow = ({
  review,
  setSelectedReview,
  setIsInfoOpen,
  setIsConfirmationOpen,
}: ReviewRowProps) => {
  return (
    <TableRow key={review?._id} className='border-b border-gray-200 w-full'>
      <TableCell className='py-3 overflow-hidden capitalize'>
        {`${review?.productId._id}`}
      </TableCell>

      <TableCell className='py-3'>{`${review.userId.firstName} ${review.userId.lastName}`}</TableCell>

      <TableCell className='flex gap-2'>
        <FiEye
          className='text-blue-500 h-7 text-md md:text-lg cursor-pointer'
          onClick={() => {
            setSelectedReview(review);
            setIsInfoOpen(true);
          }}
        />

        <FiTrash
          className='text-red-600 h-7 text-md md:text-lg cursor-pointer'
          onClick={() => {
            setSelectedReview(review);
            setIsConfirmationOpen(true);
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default ReviewRow;
