import {QueryParams} from '@/types/utils';

export const setQueryParams = ({search, filters = {}}: QueryParams) => {
  return {
    ...(search && {name: search}),

    ...(filters?.isOutOfStock && {
      isOutOfStock: filters.isOutOfStock,
    }),
    ...(filters?.minPrice && {
      minPrice: filters.minPrice,
    }),
    ...(filters?.maxPrice && {
      maxPrice: filters.maxPrice,
    }),
    ...(filters?.category && {
      category: filters.category,
    }),
  };
};
