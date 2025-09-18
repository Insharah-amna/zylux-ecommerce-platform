import {Product} from '@/types/redux';

export interface ColorPreviewProps {
  colorVariants: string[];
}

export interface ProductCardsProps {
  productsList: Product[];
  isProductsLoading?: boolean;
  className: string;
}
