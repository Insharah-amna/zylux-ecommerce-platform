import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import {PaginationComponentProps} from '@/interfaces/dashboard';

const commonClasses =
  'h-10 w-10 bg-gray-100 flex-center rounded-full transition-all duration-200';
const commonActiveClasses =
  'hover:bg-accent hover:text-white shadow-sm cursor-pointer';

const Pagination = ({
  handleNextPage,
  handlePrevPage,
  totalPages,
  currentPage,
}: PaginationComponentProps) => {
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className='flex gap-4 justify-end mt-8 items-center'>
      <button
        disabled={isPrevDisabled}
        onClick={handlePrevPage}
        className={`${commonClasses} ${isPrevDisabled ? 'text-gray-400' : commonActiveClasses}`}
      >
        <FiChevronLeft />
      </button>

      <span className='h-10 w-20 flex-center'>{`Page ${currentPage} of ${totalPages}`}</span>

      <button
        disabled={isNextDisabled}
        onClick={handleNextPage}
        className={`${commonClasses} ${isNextDisabled ? 'text-gray-400' : commonActiveClasses}`}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
