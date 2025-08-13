'use client';

import {useState} from 'react';
import {HiOutlineBars3CenterLeft} from 'react-icons/hi2';
import SearchContent from '@/components/shared/portals/SearchContent';
import MobileMenu from '@/components/shared/portals/MobileMenu';
import Logo from '@/components/shared/logo/Logo';
import NavbarPaths from './NavbarPaths';
import NavbarIcons from './NavbarIcons';
import Container from '@/components/shared/containers/Container';

const Navbar = () => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <SearchContent open={isSearchBarOpen} setOpen={setIsSearchBarOpen} />
      <MobileMenu open={isMobileMenuOpen} setOpen={setIsMobileMenuOpen} />

      <div className='flex-center w-full shadow-sm'>
        <Container>
          <div className='flex-between h-20 w-full '>
            <div className='block md:hidden text-xl'>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className='cursor-pointer'
              >
                <HiOutlineBars3CenterLeft />
              </button>
            </div>
            <div className='flex items-center w-1/3 md'>
              <Logo
                height={'h-auto'}
                width={'w-16'}
                responsiveHeight={'h-auto'}
                responsiveWidth={'w-14'}
              />
            </div>

            <NavbarPaths />

            <NavbarIcons setIsSearchBarOpen={setIsSearchBarOpen} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Navbar;
