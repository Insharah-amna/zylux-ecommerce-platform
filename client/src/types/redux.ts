export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isUserVerified: boolean;
  loginToken?: string;
  role: 'admin' | 'buyer';
  profileImage: string;
};

export type UsersState = {
  currentUser: User | null;
  cartItems: CartItem[];
  wishlist: Wishlist[];
  currency: Currency;
};

export type Currency = {
  value: string;
  label: string;
  country: string;
  rate: number;
  symbol: string;
};

export type CartItem = {
  _id?: string;
  name: string;
  price: number;
  description: string;
  categoryId: Category;
  colorVariants: string[];
  isOutOfStock: boolean;
  discount: number;
  imageUrls: string[];
  quantity: number;
};

export type Category = {
  name: string;
  _id: string;
};

export type CategoriesState = {
  list: Category[];
};

export type GetCategoryResponseType = {
  body: {
    categories: Category[];
  };
};

export type Product = {
  _id?: string;
  name: string;
  price: number;
  description: string;
  categoryId: Category;
  colorVariants: string[];
  isOutOfStock: boolean;
  discount: number;
  imageUrls: string[];
};

type Pagination = {
  page?: number;
  limit?: number;
};

export type GetProductsResponseType = {
  body: {
    products: Product[];
    pagination: Pagination;
  };
};

export type GetProductResponseType = {
  body: {
    product: Product;
  };
};

export type Order = {
  _id: string;
  userId: User;
  address: string;
  city: string;
  country: string;
  details: OrderProduct[];
  totalPrice: number;
  currency: string;
  status: string;
  createdAt: string;
};

export type OrderProduct = {
  productId: string | undefined;
  name: string;
  unitPrice: number;
  discount: number;
  quantity: number;
  images: Array<string>;
};

export type GetOrdersResponseType = {
  body: {
    orders: Order[];
    pagination: Pagination;
  };
};

export type Wishlist = {
  _id?: string;
  userId: string;
  productId: Product;
  createdAt: Date;
};

export type GetWishlistResponseType = {
  body: {
    wishlist: Wishlist[];
  };
};

export type Review = {
  _id?: string;
  userId: User;
  productId: Product;
  rating: number;
  comment: string;
};

export type GetReviewResponseType = {
  body: {
    pagination: Pagination;
    reviews: Review[];
  };
};

export type ReviewData = {
  rating: number;
  subject: string;
  comment: string;
};
