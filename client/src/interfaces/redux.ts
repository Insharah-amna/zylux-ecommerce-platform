import {
  GetCategoryResponseType,
  GetProductResponseType,
  GetProductsResponseType,
  OrderProduct,
} from '@/types/redux';
import {User} from '@/types/redux';

export interface Response {
  statusCode: number;
  message: string;
}

export interface LoginUserResponse extends Response {
  user: User;
}

export interface SignupUserResponse extends Response {
  user: User;
}

export interface ForgotPasswordResponse extends Response {
  user: User;
}

export interface ResetPasswordResponse extends Response {
  user: User;
}

export interface VerifyEmailResponse extends Response {
  user: User;
}

export interface ResendEmailResponse extends Response {
  user: User;
}

// Category Responses
export interface AddCategoryResponse extends Response {
  name: string;
}

export interface GetCategoryResponse extends Response, GetCategoryResponseType {
  name: string;
}
export interface EditCategoryResponse extends Response {
  name: string;
}
export interface DeleteCategoryResponse extends Response {
  name: string;
}

// Products Responses

export interface AddProductResponses extends Response {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  colorVariants: Array<string>;
  imageUrls: Array<string>;
}
export interface GetProductsResponses
  extends Response,
    GetProductsResponseType {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  colorVariants: Array<string>;
  isOutOfStock: boolean;
  discount: number;
  imageUrls: Array<string>;
}

export interface GetProductResponses extends Response, GetProductResponseType {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  colorVariants: Array<string>;
  isOutOfStock: boolean;
  discount: number;
  imageUrls: Array<string>;
}

export interface UpdateProductResponses extends Response {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  colorVariants: Array<string>;
  imageUrls: Array<string>;
}

export interface DeleteProductResponses extends Response {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  colorVariants: Array<string>;
  imageUrls: Array<string>;
}

// Orders Responses

export interface CreateOrderResponse extends Response {
  body: {
    checkoutUrl: string;
  };
}

export interface OrderPayload {
  details: OrderProduct[];
  totalPrice: number;
  currency: string;
  address: string;
  city: string;
  country: string;
}

interface ToastMessageConfig {
  success: {
    show: boolean;
    customMessage?: string;
  };
  error: {
    show: boolean;
    customMessage?: string;
  };
}

export interface ApiResponseObject<T = unknown> {
  statusCode?: number;
  message?: string;
  body: T | null;
  error?: any;
  type?: string | null;
}

export interface FinalResponse<T> {
  body?: T | null;
  error?: any;
}

export interface HandleApiResponseParams {
  queryFulfilled: Promise<any>;
  toastMessage?: ToastMessageConfig;
}
