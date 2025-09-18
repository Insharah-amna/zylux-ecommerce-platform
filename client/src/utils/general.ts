import {QueryParams} from '@/types/utils';
import {Product, User, Wishlist} from '@/types/redux';

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
    ...(filters?.sortBy && {
      sortBy: filters.sortBy,
    }),
    ...(filters?.rating && {
      rating: filters.rating,
    }),
  };
};

export const extractProduct = ({data}: any) => {
  return data.map((product: Wishlist) => product.productId);
};

export const createWishlistItem = ({
  user,
  product,
}: {
  user: User;
  product: Product;
}) => ({
  userId: user?._id,
  productId: product,
  createdAt: new Date(),
});
