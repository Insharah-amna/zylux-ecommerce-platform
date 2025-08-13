import {FiMenu} from 'react-icons/fi';
import {HeaderProps} from '@/interfaces/layout';

const Header = ({onToggleSidebar}: HeaderProps) => {
  return (
    <header className='fixed top-0 left-0 right-0 z-10 bg-white shadow-sm p-4 flex items-center justify-between lg:pl-[276px] '>
      <h1 className='text-xl font-semibold'>Header</h1>
      <button
        onClick={onToggleSidebar}
        className='p-2 rounded-md hover:bg-gray-100 lg:hidden'
        aria-label='Toggle sidebar'
      >
        <FiMenu />
      </button>
    </header>
  );
};

export default Header;
