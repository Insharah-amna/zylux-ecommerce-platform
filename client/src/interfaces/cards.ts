import {Product} from '@/types/redux';
import {IdProps} from './dashboard';

export interface ColorPreviewProps {
  colorVariants: string[];
}

export interface ProductCardsProps {
  productsList: Product[];
  isProductsLoading: boolean;
  className: string;
}
