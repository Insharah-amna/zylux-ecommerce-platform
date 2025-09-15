import {UserMessage} from '@/types/messages';
import {
  GetCategoryResponseType,
  GetOrdersResponseType,
  GetProductResponseType,
  GetProductsResponseType,
  GetReviewResponseType,
  GetWishlistResponseType,
  OrderProduct,
  Product,
} from '@/types/redux';
import {User} from '@/types/redux';
import {Notification} from './notifications';

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

export interface UpdateProfileResponse extends Response {
  firstName: string;
  lastName: string;
  profileImage?: File | null;
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
  averageRating: number;
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
  averageRating: number;
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

export interface GetOrdersResponse extends Response, GetOrdersResponseType {
  _id: string;
  userId: string;
  address: string;
  city: string;
  country: string;
  details: OrderProduct[];
  totalPrice: number;
  currency: string;
  status: string;
  createdAt: Date;
}

export interface OrderPayload {
  details: OrderProduct[];
  totalPrice: number;
  currency: string;
  address: string;
  city: string;
  country: string;
}

// Wishlist Responses

export interface AddToWishlistResponse extends Response {
  productId: string;
}

export interface GetWishlistResponse extends Response, GetWishlistResponseType {
  _id: string;
  userId: string;
  productId: Product;
  createdAt: Date;
}

export interface RemoveFromWishlistResponse extends Response {
  _id: string;
  userId: string;
  productId: Product;
  createdAt: Date;
}

// Reviews Responses

export interface AddReviewResponse extends Response {
  userId: string;
  productId: Product;
  rating: number;
  comment: string;
}

export interface GetReviewItemsResponse
  extends Response,
    GetReviewResponseType {
  _id: string;
  userId: User;
  productId: Product;
  rating: number;
  subject: string;
  comment: string;
}

export type GetReviewsResponse = GetReviewItemsResponse[];

// Messages Responses

export interface SendMessageResponse extends Response {
  senderId: string;
  receiverId: string;
  message: string;
}

export interface GetUserMessagesResponse extends Response {
  body: {
    usersList: UserMessage[];
  };
}

export interface GetReviewsResponseFromApi {
  statusCode: number;
  message: string;
  body: {
    pagination: {
      totalPages: number | null;
    };
    reviews: GetReviewItemsResponse[];
  };
}

export interface FetchReviewByIdPayload {
  productId: string;
}

export interface DeleteReviewResponse extends Response {
  _id: string;
  userId: string;
  productId: Product;
  rating: number;
  comment: string;
}

export interface DeleteReviewPayload {
  _id: string;
}

// Notifications Responses

export interface SendNotificationResponse extends Response {
  userId: string;
  relatedId: string;
  typeRef: string;
  message: string;
}

export interface GetNotificationResponse extends Response {
  body: {
    notifications: Notification[];
  };
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
