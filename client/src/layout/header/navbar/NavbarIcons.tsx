'use client';
import Link from 'next/link';
import {useSelector} from 'react-redux';
import {FiHeart, FiShoppingBag} from 'react-icons/fi';
import {getCartItems, getWishlist} from '@/redux/slices/users/usersSlice';
import {FOOTER_URLS} from '@/utils/PATHS';
import ProfileDropdown from '@/components/shared/dropdowns/ProfileDropdown';

const NavbarIcons = () => {
  const cartItems = useSelector(getCartItems);
  const wishlist = useSelector(getWishlist);

  return (
    <div className='flex-end gap-5 text-primary text-xl w-1/3'>
      <ProfileDropdown />

      <button className='hidden md:block relative cursor-pointer'>
        <FiHeart className='hover:text-gray-700 hidden md:block' />
        <span className='absolute -top-1.5 -right-1.5 bg-accent rounded-full h-4 w-4 text-white text-xs text-center flex-center'>
          {wishlist.length}
        </span>
      </button>

      <button className='relative cursor-pointer'>
        <Link href={FOOTER_URLS.companyOptions.cart}>
          <FiShoppingBag className='hover:text-gray-700' />
          <span className='absolute -top-1.5 -right-1.5 bg-accent rounded-full h-4 w-4 text-white text-xs text-center flex-center'>
            {cartItems.length}
          </span>
        </Link>
      </button>
    </div>
  );
};

export default NavbarIcons;
