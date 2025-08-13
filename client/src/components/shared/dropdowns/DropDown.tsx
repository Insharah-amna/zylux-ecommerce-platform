'use client';

import {FiChevronDown} from 'react-icons/fi';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {DropdownProps} from '@/interfaces/input';
import {dispatch} from '@/redux/store';
import {actions} from '@/redux/slices/users/usersSlice';

const DropDown = ({
  options,
  className,
  selectedValue,
  isOpen,
  setIsOpen,
}: DropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`${className} flex gap-1 cursor-pointer focus:ring-0`}
          onClick={() => setIsOpen(true)}
        >
          {selectedValue}
          <FiChevronDown />
        </button>
      </DropdownMenuTrigger>

      {isOpen ? (
        <DropdownMenuContent>
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => dispatch(actions.setCurrency(option))}
              className='cursor-pointer'
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      ) : (
        ''
      )}
    </DropdownMenu>
  );
};

export default DropDown;
