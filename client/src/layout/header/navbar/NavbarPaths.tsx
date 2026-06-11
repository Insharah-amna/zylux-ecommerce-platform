import Link from 'next/link';
import {NAVBAR_PATHS} from '@/constants/home';

const NavbarPaths = () => {
  return (
    <div className='hidden md:block flex-center gap-10 text-center w-1/3'>
      {NAVBAR_PATHS.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className='px-4 py-2 text-primary hover:text-accent transition-colors duration-250'
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default NavbarPaths;
