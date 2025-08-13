import {Product} from '@/types/redux';
import {Dispatch, SetStateAction} from 'react';

export interface SearchFilterProps {
  searchValue?: string;
  setSearchValue: (data: string) => void;
  handleSearch: (data: any) => void;
}

export interface PriceFilterProps {
  values: number[];
  setValues: (data: any) => void;
}

export interface CategoryFilterProps {
  categoryList: any;
  isCategoriesLoading: boolean;
  categories: string[];
  handleCheckboxChange: (data: string) => void;
}

export interface ProductPreviewParamProps {
  params: Promise<{id: string}>;
}

export interface ProductPreviewIdProps {
  productId: string;
}

export interface ProductImageProps {
  product: Product;
  showProductImage?: string;
  setShowProductImage: Dispatch<SetStateAction<string>>;
}

export interface ProductColorProps {
  product: Product;
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
}

export interface ProductQuantityProps {
  selectedQuantity: number;
  setSelectedQuantity: Dispatch<SetStateAction<number>>;
}

export interface ProductButtonProps {
  product: Product;
  quantity: number;
}
