import {combineReducers, Reducer} from 'redux';
import {persistReducer, PersistConfig} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import userReducer from './slices/users/usersSlice';
import categoryReducer from './slices/categories/categoriesSlice';
import {RootState} from './store';
import {clearStore} from './utils';
import {usersApiSlice} from './slices/users/usersApi';
import {categoriesApiSlice} from './slices/categories/categoriesApi';
import {productsApiSlice} from './slices/products/productsApi';
import {ordersApiSlice} from './slices/orders/ordersApi';

interface NoopStorage {
  getItem: () => Promise<string | null>;
  setItem: (_key: string, value: string) => Promise<string>;
  removeItem: () => Promise<void>;
}

const createNoopStorage = (): NoopStorage => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const rootPersistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const userPersistConfig: PersistConfig<any> = {
  key: 'users',
  storage,
  keyPrefix: 'redux-',
};

const categoriesPersistConfig: PersistConfig<any> = {
  key: 'categories',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['list'],
};

const reduxAppReducer = combineReducers({
  users: persistReducer(userPersistConfig, userReducer),
  categories: persistReducer(categoriesPersistConfig, categoryReducer),
  [usersApiSlice.reducerPath]: usersApiSlice.reducer,
  [categoriesApiSlice.reducerPath]: categoriesApiSlice.reducer,
  [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  [ordersApiSlice.reducerPath]: ordersApiSlice.reducer,
});

const rootReducer: Reducer<any> = (state, action) => {
  if (action.type === clearStore.type) {
    storage.removeItem('persist:root');
    storage.removeItem('persist:users');
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }

    return reduxAppReducer(undefined, action);
  }

  return reduxAppReducer(state, action);
};

export {rootPersistConfig, rootReducer};

export type {RootState};
