export type User = {
  firstName: string;
  lastName: string;
  email: string;
  isUserVerified: boolean;
  loginToken?: string;
};

export type UsersState = {
  currentUser: User | null;
  cartItems: CartItem[];
  currency: Currency;
};

export type Currency = {
  value: string;
  label: string;
  country: string;
  rate: number;
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
