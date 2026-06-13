import Link from 'next/link';
import {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {LiaTimesSolid} from 'react-icons/lia';
import {SearchbarContentProps} from '@/interfaces/portals';
import useSideContentExpand from '@/hooks/useSideContentExpand';
import {NAVBAR_PATHS} from '@/constants/home';

const MobileMenu = ({open, setOpen}: SearchbarContentProps) => {
  const {shouldExpand} = useSideContentExpand({open});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`${
        open ? 'block' : 'hidden'
      } transition-all min-h-screen w-full bg-black/30 absolute top-0 z-[999]`}
    >
      <div
        className={`absolute left-0 min-h-screen transition-all duration-400 ease-in-out ${
          shouldExpand ? `w-full py-6 px-4` : 'w-0 overflow-hidden py-0 px-0'
        }  bg-white`}
      >
        <button
          onClick={() => setOpen(false)}
          className='cursor-pointer text-xl'
        >
          <LiaTimesSolid />
        </button>

        <div className='flex flex-col px-6 mt-4'>
          {NAVBAR_PATHS.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className='py-4 border-b-1 border-gray-300 text-primary hover:text-accent transition-colors duration-250'
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MobileMenu;
