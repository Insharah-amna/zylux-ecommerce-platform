import {useState} from 'react';
import {FilterHookProps} from '@/interfaces/hooks';

export const useFilters = ({queryOptions}: FilterHookProps) => {
  const [filters, setFilters] = useState(queryOptions?.filters);

  const resetFilters = () => {
    setFilters(queryOptions?.filters);
  };

  return {filters, setFilters, resetFilters};
};
