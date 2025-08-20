import {useSelector} from 'react-redux';
import {FiHeart, FiSearch, FiShoppingBag, FiUser} from 'react-icons/fi';
import {getCartItems} from '@/redux/slices/users/usersSlice';
import {NavbarIconProps} from '@/interfaces/headers';
import Link from 'next/link';
import {FOOTER_URLS, PROFILE_ROOT} from '@/utils/PATHS';

const NavbarIcons = ({setIsSearchBarOpen}: NavbarIconProps) => {
  const cartItems = useSelector(getCartItems);

  return (
    <div className='flex-end gap-5 text-primary text-xl w-1/3'>
      <button
        onClick={() => setIsSearchBarOpen(true)}
        className='cursor-pointer'
      >
        <FiSearch className='hover:text-gray-700' />
      </button>

      <Link href={PROFILE_ROOT}>
        <button className='hidden md:block cursor-pointer'>
          <FiUser className='hover:text-gray-700' />
        </button>
      </Link>

      <button className='hidden md:block relative cursor-pointer'>
        <FiHeart className='hover:text-gray-700 hidden md:block' />
        <span className='absolute -top-1.5 -right-1.5 bg-accent rounded-full h-4 w-4 text-white text-xs text-center flex-center'>
          0
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
