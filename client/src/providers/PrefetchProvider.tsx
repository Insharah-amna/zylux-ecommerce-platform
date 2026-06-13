'use client';
import {NodeChildrenProps} from '@/interfaces/common';
import {useFetchWishlistByUserIdQuery} from '@/redux/slices/wishlist/wishlistApi';

const PrefetchProvider = ({children}: NodeChildrenProps) => {
  useFetchWishlistByUserIdQuery();
  return children;
};

export default PrefetchProvider;
