import {createSlice} from '@reduxjs/toolkit';
import {UsersState} from '@/types/redux';
import {getCurrencyConversion} from '@/utils/currencyUtils';

const defaultState: UsersState = {
  currentUser: null,
  cartItems: [],
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
  },
});

export default slice.reducer;

export const actions = slice.actions;

export const getCurrentUser = (state: {users: UsersState}) =>
  state.users.currentUser;

export const getUserRole = (state: {users: UsersState}) =>
  state.users.currentUser?.role;

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
    return total + item.price * item.quantity;
  }, 0);

  const finalPrice = getCurrencyConversion({
    price: totalPrice,
    currency: state.users.currency.label,
  });

  return finalPrice;
};

export const getCurrency = (state: {users: UsersState}) => state.users.currency;
