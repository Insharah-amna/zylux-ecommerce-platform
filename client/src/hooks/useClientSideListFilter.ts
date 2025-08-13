import {useSelector} from 'react-redux';
import {useSearch} from './useSearch';
import {usePagination} from './usePagination';
import {ClientSideFilterListHookProps} from '@/interfaces/hooks';

const useClientSideListFilter = ({
  selector,
  queryOptions,
}: ClientSideFilterListHookProps) => {
  const data = useSelector(selector);

  const {
    search,
    setSearch,
    searchedData,
    handleSearch: handleSearchFn,
    resetSearchedData,
  } = useSearch({
    data,
    queryOptions,
  });

  const {
    currentPage,
    limit,
    PaginationComponent,
    filteredData,
    setPageOptions,
  } = usePagination({data: searchedData, queryOptions});

  const resetFilters = () => {
    setSearch(queryOptions.searchOptions?.search);
    setPageOptions((prev) => ({...prev, page: 1}));
    resetSearchedData();
  };

  const handleSearch = () => {
    handleSearchFn();
    setPageOptions((prev) => ({...prev, page: 1}));
  };

  return {
    filteredData,
    PaginationComponent,
    currentPage,
    limit,
    setPageOptions,
    handleSearch,
    search,
    setSearch,
    resetFilters,
  };
};

export default useClientSideListFilter;
