import {Dispatch, SetStateAction} from 'react';
import {Option} from '@/types/home';
import {CartItem} from '@/types/redux';

export interface TextInputProps {
  control: any;
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

export interface ErrorMessageProps {
  errorMessage?: string;
}

interface SelectOption {
  value: string;
  label: string;
}
export interface SelectInputProps {
  name: string;
  control: any;
  className?: string;
  label: string;
  options: SelectOption[];
  isDisabled?: boolean;
}

export interface DropdownProps {
  options: Option[];
  className?: string;
  selectedValue: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface CheckboxInputProps {
  label: string;
  disabled?: boolean;
  checked?: boolean;
  onChange: () => void;
}

export interface TableSearchInputProps {
  search: string | undefined;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  handleSearch: (data: any) => void;
  resetFilters: () => void;
  isResetButtonShown: boolean | string;
}

export interface QuantitySelectorProps {
  product: CartItem;
  handleIncrement: (data: any) => void;
  handleDecrement: (data: any) => void;
}
