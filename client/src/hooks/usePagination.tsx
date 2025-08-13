import {useState} from 'react';
import Pagination from '@/components/shared/pagination';
import {PaginationHookProps} from '@/interfaces/hooks';

export const usePagination = ({
  serverSideComputedTotalPages = 0,
  data = [],
  queryOptions,
}: PaginationHookProps) => {
  const [pageOptions, setPageOptions] = useState(queryOptions?.pageOptions);

  const handleNextPage = () => {
    setPageOptions((prev) => ({...prev, page: prev.page + 1}));
  };

  const handlePrevPage = () => {
    setPageOptions((prev) => ({
      ...prev,
      page: prev.page > 1 ? prev.page - 1 : 1,
    }));
  };

  let paginatedData = [];

  let totalPages = serverSideComputedTotalPages;

  if (data.length > 0) {
    totalPages = Math.ceil(data.length / pageOptions.limit);

    const startIndex = (pageOptions.page - 1) * pageOptions.limit;
    const endIndex = startIndex + pageOptions.limit;
    paginatedData = data.slice(startIndex, endIndex);
  }

  return {
    handleNextPage,
    handlePrevPage,
    currentPage: pageOptions?.page,
    limit: pageOptions?.limit,
    setPageOptions,
    filteredData: paginatedData,
    PaginationComponent: (
      <Pagination
        currentPage={pageOptions?.page}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        totalPages={totalPages}
      />
    ),
  };
};
