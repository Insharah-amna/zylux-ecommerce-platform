import {configureStore} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import {rootPersistConfig, rootReducer} from './rootReducer';
import {usersApiSlice} from './slices/users/usersApi';
import {categoriesApiSlice} from './slices/categories/categoriesApi';
import {productsApiSlice} from './slices/products/productsApi';
import {ordersApiSlice} from './slices/orders/ordersApi';

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      ImmutableCheck: false,
    }).concat(
      usersApiSlice.middleware,
      categoriesApiSlice.middleware,
      productsApiSlice.middleware,
      ordersApiSlice.middleware
    ),
});

const persistor = persistStore(store);

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

const dispatch: AppDispatch = store.dispatch;

export {store, persistor, dispatch};

export type {RootState, AppDispatch};
