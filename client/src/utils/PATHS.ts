import {FiBookmark, FiClock, FiGrid, FiTag} from 'react-icons/fi';
import {TokenProps} from '@/interfaces/auth';
import {IdProps} from '@/interfaces/dashboard';

export const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const path = (root: string, path: string) => {
  return `${root}${path}`;
};

export const ROOT_ROUTE = '/';
export const AUTH_ROOT = '/auth';
export const DASHBOARD_ROOT = '/dashboard';
export const HOME_ROOT = '/home';
export const SHOP_ROOT = '/shop';
export const PROFILE_ROOT = '/profile';

export const PROFILE_PATHS = {
  profile: `${PROFILE_ROOT}?tab=profile`,
  wishlist: `${PROFILE_ROOT}?tab=wishlist`,
  orders: `${PROFILE_ROOT}?tab=orders`,
  cart: `${PROFILE_ROOT}?tab=cart`,
};

export const AUTH_ROUTES = {
  login: path(AUTH_ROOT, '/login'),
  signup: path(AUTH_ROOT, '/signup'),
  forgotPassword: path(AUTH_ROOT, '/forgot-password'),
  resetPassword: path(AUTH_ROOT, '/reset-password'),
};

export const PUBLIC_ROUTES = {
  singleProduct: ({_id}: IdProps) => path(SHOP_ROOT, `/${_id}`),
};

export const PUBLIC_API_URLS = {
  orderSucceed: '/order-succeed',
  orderFailed: '/order-failed',
};

export const AUTH_API_URLS = {
  login: '/users/login',
  signup: '/users/signup',
  forgotPassword: '/users/forgot-password',
  resetPassword: ({token}: TokenProps) => `/users/reset-password/${token}`,
  verifyEmail: ({token}: TokenProps) => `/users/verify-email/${token}`,
  resendVerificationEmail: ({email}: TokenProps) =>
    `/users/resend-email-verification/${email}`,
};

export const DASHBOARD_ROUTES = {
  categories: path(DASHBOARD_ROOT, '/categories'),
  products: path(DASHBOARD_ROOT, '/products'),
  orders: path(DASHBOARD_ROOT, '/orders'),
  reviews: path(DASHBOARD_ROOT, '/reviews'),
};

export const DASHBOARD_API_URLS = {
  category: {
    addCategory: '/categories',
    getCategories: '/categories',
    updateCategory: ({_id}: IdProps) => `/categories/${_id}`,
    deleteCategory: ({_id}: IdProps) => `/categories/${_id}`,
  },
  product: {
    addProduct: '/products',
    getProducts: '/products',
    getSingleProduct: ({_id}: IdProps) => `/products/${_id}`,
    updateProducts: ({_id}: IdProps) => `/products/${_id}`,
    deleteProducts: ({_id}: IdProps) => `/products/${_id}`,
  },
};

export const ORDER_API_URLS = {
  createOrder: '/orders',
  getOrders: '/orders',
  getOrdersByUserId: '/orders/user-orders',
};

export const WISHLIST_API_URLS = {
  addToWishlist: ({_id}: IdProps) => `/wishlist/${_id}`,
  getWishlistbyUserId: '/wishlist',
  removeFromWishlist: ({_id}: IdProps) => `/wishlist/${_id}`,
};

export const REVIEW_API_URLS = {
  addReview: ({_id}: IdProps) => `/reviews/${_id}`,
  fetchReviews: '/reviews',
  fetchReviewsByProductId: ({_id}: IdProps) => `/reviews/${_id}`,
  deleteReview: ({_id}: IdProps) => `/reviews/${_id}`,
};

export const DASHBOARD_SIDEBAR_ITEMS = [
  {title: 'Categories', icon: FiGrid, url: DASHBOARD_ROUTES.categories},
  {title: 'Products', icon: FiTag, url: DASHBOARD_ROUTES.products},
  {title: 'Orders', icon: FiClock, url: DASHBOARD_ROUTES.orders},
  {title: 'Reviews', icon: FiBookmark, url: DASHBOARD_ROUTES.reviews},
];

export const NAVBAR_URLS = {
  home: '/',
  shop: '/shop',
  blog: '/blog',
};

export const FOOTER_URLS = {
  quickLinks: {
    faq: '/faq',
    storeLocation: '/store-location',
    privacyPolicy: '/privacy-policy',
    returnPolicy: '/return-policy',
    termsOfService: '/terms-of-service',
  },
  companyOptions: {
    wishlist: PROFILE_PATHS.wishlist,
    myAccount: '/my-account',
    cart: '/cart',
    aboutUs: '/about-us',
  },
};
