import {FiClock, FiHeart, FiShoppingBag, FiUser} from 'react-icons/fi';
import {ProfileTabProps} from '@/interfaces/profile';
import Orders from '@/components/orders';
import Wishlist from '@/components/wishlist';
import CartItems from '@/components/cart/CartItems';

export const PROFILE_TABS: ProfileTabProps = {
  profile: {
    value: 'profile',
    label: 'Profile',
    icon: FiUser,
    component: FiUser,
  },
  orders: {
    value: 'orders',
    label: 'Orders',
    icon: FiClock,
    component: Orders,
  },
  wishlist: {
    value: 'wishlist',
    label: 'Wishlist',
    icon: FiHeart,
    component: Wishlist,
  },
  cart: {
    value: 'cart',
    label: 'Cart',
    icon: FiShoppingBag,
    component: CartItems,
  },
};
