'use client';

import {useEffect, useState} from 'react';
import {usePagination} from './usePagination';
import {ServerSideListFilterHookProps} from '@/interfaces/hooks';
import {useSearch} from './useSearch';
import {useFilters} from './useFilters';
import {setQueryParams} from '@/utils/general';

export const useServerSideListFilter = ({
  queryToCall,
  queryKey,
  queryOptions,
}: ServerSideListFilterHookProps) => {
  const [serverSideComputedTotalPages, setServerSideComputedTotalPages] =
    useState(1);

  const {
    handleNextPage,
    handlePrevPage,
    currentPage,
    limit,
    PaginationComponent,
    setPageOptions,
  } = usePagination({
    serverSideComputedTotalPages,
    queryOptions,
  });

  const {
    search,
    setSearch,
    handleSearch: handleSearchFn,
    resetSearchedData,
    committedSearch,
    setCommittedSearch,
  } = useSearch({
    queryOptions,
  });

  const {filters, setFilters, resetFilters} = useFilters({queryOptions});

  const filtersParams = setQueryParams({
    search: committedSearch,
    filters,
  });

  const params = {
    page: currentPage,
    limit,
    ...(filtersParams ?? {}),
  };

  const {isLoading, data, error} = queryToCall(params);

  const filteredData = data?.body[queryKey] ?? [];

  const totalPages = data?.body?.pagination?.totalPages ?? 0;

  useEffect(() => setServerSideComputedTotalPages(totalPages), [totalPages]);

  const resetAllFilters = () => {
    setSearch(queryOptions.searchOptions?.search);
    setPageOptions((prev) => ({...prev, page: 1}));
    resetSearchedData();
    resetFilters();
    setCommittedSearch('');
  };

  const handleSearch = () => {
    handleSearchFn();
    setPageOptions((prev) => ({...prev, page: 1}));
  };

  return {
    filteredData,
    isLoading,
    error,
    handlePrevPage,
    handleNextPage,
    PaginationComponent,
    search,
    setSearch,
    filters,
    setFilters,
    handleSearch,
    resetAllFilters,
  };
};
