import {useDispatch} from 'react-redux';
import Link from 'next/link';
import {FiLogOut} from 'react-icons/fi';
import {actions as userActions} from '@/redux/slices/users/usersSlice';
import {actions as categoryActions} from '@/redux/slices/categories/categoriesSlice';
import {SidebarProps} from '@/interfaces/layout';
import {AUTH_ROUTES, SIDEBAR_ITEMS} from '@/utils/PATHS';

export default function Sidebar({isOpen}: SidebarProps) {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(userActions.resetUsersSlice());
    dispatch(categoryActions.resetCategoriesSlice());
  };

  return (
    <div
      className={`fixed top-0 left-0 z-30 w-64 h-screen bg-white text-primary shadow-sm transition-transform duration-300 ease-in-out
        ${!isOpen ? '-translate-x-full' : 'translate-x-0'}
        lg:translate-x-0`}
    >
      <div className='py-4 px-5 text-2xl font-bold'>ShopEase</div>

      <nav className='flex flex-col p-4'>
        <div className='sidebar'>
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                href={item.url}
                key={item.title}
                className='flex items-center gap-[10px] p-2 rounded-md transition-colors hover:bg-gray-200'
              >
                <Icon />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <nav className='fixed bottom-8 w-full flex p-4'>
        <div className='w-full' onClick={onClick}>
          <Link
            href={AUTH_ROUTES.login}
            className='flex items-center gap-[10px] p-2 rounded-md transition-colors hover:bg-gray-200'
          >
            <FiLogOut />
            <span>Log out</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
