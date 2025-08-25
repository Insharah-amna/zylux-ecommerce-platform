'use client';
import {ReviewTableProps} from '@/interfaces/reviews';
import {useServerSideListFilter} from '@/hooks/useServerSideListFilter';
import {useFetchReviewsQuery} from '@/redux/slices/reviews/reviewsApi';
import {QUERY_PARAMS} from '@/constants/queryParams';
import ComponentLoader from '@/components/shared/loaders/ComponentLoader';
import {REVIEWS_TABLE_HEADER} from '@/constants/reviews';
import {Review} from '@/types/redux';
import ReviewRow from './ReviewRow';
import CustomTable from '@/components/shared/tables/CustomTable';
import {TableCell, TableRow} from '@/components/ui/table';

const ReviewTable = ({
  setSelectedReview,
  setIsInfoOpen,
  setIsConfirmationOpen,
}: ReviewTableProps) => {
  const {
    filteredData: reviewsList,
    isLoading: isReviewsLoading,
    PaginationComponent,
  } = useServerSideListFilter({
    queryToCall: useFetchReviewsQuery,
    queryKey: 'reviews',
    queryOptions: QUERY_PARAMS.reviews,
  });
  console.log(reviewsList);

  const reviewsTableHeader = Object.values(REVIEWS_TABLE_HEADER);

  if (isReviewsLoading) return <ComponentLoader />;

  return (
    <>
      <CustomTable
        tableHeaders={reviewsTableHeader}
        tableBody={
          <>
            {reviewsList.map((review: Review) => (
              <ReviewRow
                review={review}
                setSelectedReview={setSelectedReview}
                setIsInfoOpen={setIsInfoOpen}
                setIsConfirmationOpen={setIsConfirmationOpen}
              />
            ))}
            {reviewsList.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className='w-full text-center py-6 text-gray-500'
                >
                  No reviews yet.
                </TableCell>
              </TableRow>
            )}
          </>
        }
      />
      {PaginationComponent}
    </>
  );
};

export default ReviewTable;
