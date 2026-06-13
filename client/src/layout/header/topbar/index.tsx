'use client';

import Link from 'next/link';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {CURRENCY_ARRAY, SOCIAL_ICON_LINKS} from '@/constants/home';
import DropDown from '@/components/shared/dropdowns/DropDown';
import TopbarSwiper from './TopbarSwiper';
import Container from '@/components/shared/containers/Container';
import {actions, getCurrency} from '@/redux/slices/users/usersSlice';
import {dispatch} from '@/redux/store';

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const currency = useSelector(getCurrency);

  return (
    <div className='flex-center w-full bg-primary'>
      <Container>
        <header className='flex-center justify-between text-white h-8'>
          <div className='hidden md:flex items-center gap-[10px] cursor-pointer h-6 w-75'>
            {SOCIAL_ICON_LINKS.map(({icon: Icon, value, url}) => (
              <Link
                key={value}
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:scale-110 max-w-4 transition-transform duration-200 cursor-pointer'
              >
                <Icon color='white' />
              </Link>
            ))}
          </div>

          <TopbarSwiper />

          <div className='hidden md:flex justify-end text-sm w-75'>
            <DropDown
              options={CURRENCY_ARRAY}
              className='flex h-6 items-center'
              selectedValue={currency.label}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              handleClick={(option) => dispatch(actions.setCurrency(option))}
            />
          </div>
        </header>
      </Container>
    </div>
  );
};

export default TopBar;
