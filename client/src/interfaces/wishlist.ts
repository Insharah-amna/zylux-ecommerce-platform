import {Wishlist} from '@/types/redux';

export interface WishlistTableProps {
  setSelectedProduct: (data: any) => void;
  setIsInfoOpen: (data: any) => void;
}

export interface RemoveFromWishlist {
  _id?: string;
  productId: string;
}

export interface AddToWishlist {
  _id: string;
  wishlistItem: Wishlist;
}
