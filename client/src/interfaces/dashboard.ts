import {
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  Dispatch,
  BaseSyntheticEvent,
} from 'react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormSetValue,
} from 'react-hook-form';
import {Category} from '@/types/redux';

export interface IdProps {
  _id?: string;
}

export interface ParamProps {
  page: number;
  limit: number;
}

export interface PaginationComponentProps {
  handleNextPage: MouseEventHandler<HTMLButtonElement>;
  handlePrevPage: MouseEventHandler<HTMLButtonElement>;
  totalPages: number;
  currentPage: number;
}

export interface CategoryPayload {
  name: string;
  _id?: string;
}

export interface CategoryId {
  value?: string;
  label: string;
}

export interface CategoryTableProps {
  categoryList: any;
  setValue: UseFormSetValue<CategoryPayload>;
  setIsEditing: (data: any) => void;
  setDeleteId: (data: any) => void;
  setIsConfirmationOpen: (data: any) => void;
  PaginationComponent: ReactNode;
  search: string | undefined;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  handleSearch: (data: string) => void;
  resetFilters: () => void;
  isResetButtonShown: boolean;
}

export interface CategoryRowProps {
  category: Category | null;
  handleEditClick: (data: any) => void;
  handleDelete: (data: any) => void;
}

export interface CategoryFormProps {
  control: any;
  reset: () => void;
  isEditing: boolean;
  setIsEditing: (data: boolean) => void;
  handleSubmit: (
    onValid: SubmitHandler<CategoryPayload>,
    onInvalid?: SubmitErrorHandler<CategoryPayload>
  ) => (e?: BaseSyntheticEvent) => Promise<void>;
}
