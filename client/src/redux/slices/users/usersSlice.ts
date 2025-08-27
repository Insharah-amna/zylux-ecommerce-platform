import {createSlice} from '@reduxjs/toolkit';
import {UsersState} from '@/types/redux';
import {getCurrencyConversion} from '@/utils/currencyUtils';

const defaultState: UsersState = {
  currentUser: null,
  cartItems: [],
  wishlist: [],
  currency: {
    value: 'pkr',
    symbol: 'Rs',
    label: 'PKR',
    country: 'Pakistan',
    rate: 1,
  },
};

const slice = createSlice({
  name: 'users',
  initialState: defaultState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    resetUsersSlice: () => defaultState,

    setCartItem(state, action) {
      state.cartItems.push(action.payload);
    },

    incrementItemQuantity(state, action) {
      const {_id} = action.payload;

      const item = state.cartItems?.find((cartItem) => cartItem._id === _id);
      if (item) item.quantity += 1;
    },

    decrementItemQuantity(state, action) {
      const {_id} = action.payload;

      const item = state.cartItems?.find((cartItem) => cartItem._id === _id);

      if (item && item.quantity > 1) item.quantity -= 1;
    },

    removeItemFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload
      );
    },

    resetCartItems: (state) => {
      state.cartItems = [];
    },

    setCurrency(state, action) {
      state.currency = action.payload;
    },

    setWishlist(state, action) {
      state.wishlist = action.payload;
    },

    addItemToWishlist(state, action) {
      state.wishlist.push(action.payload);
    },

    removeItemFromWishlist(state, action) {
      state.wishlist = state.wishlist.filter(
        (wishlistItem) => wishlistItem.productId._id !== action.payload
      );
    },

    updateUserProfile(state, action) {
      if (state.currentUser) {
        state.currentUser = {...state.currentUser, ...action.payload};
      }
    },
  },
});

export default slice.reducer;

export const actions = slice.actions;

export const getCurrentUser = (state: {users: UsersState}) =>
  state.users.currentUser;

export const getUserRole = (state: {users: UsersState}) =>
  state.users.currentUser?.role;

export const getWishlist = (state: {users: UsersState}) => state.users.wishlist;

export const getWishlistByProductId =
  ({productId}: {productId: string}) =>
  (state: {users: UsersState}) => {
    const existedItem = state.users.wishlist.find((item) => {
      if (typeof item.productId === 'object') {
        return item.productId._id === productId;
      }
      return item.productId === productId;
    });

    return existedItem;
  };

export const getCartItems = (state: {users: UsersState}) =>
  state.users.cartItems;

export const getCartItem =
  ({productId}: {productId: string}) =>
  (state: {users: UsersState}) => {
    const existedProduct = state.users.cartItems.find(
      (item) => item._id === productId
    );

    return existedProduct;
  };

export const getTotalPrice = (state: {users: UsersState}) => {
  const totalPrice = state.users.cartItems.reduce((total, item) => {
    const discountedPrice = item.price - (item.price * item.discount) / 100;

    return total + discountedPrice * item.quantity;
  }, 0);

  const finalPrice = getCurrencyConversion({
    price: totalPrice,
    currency: state.users.currency.label,
  });

  return finalPrice;
};

export const getCurrency = (state: {users: UsersState}) => state.users.currency;
