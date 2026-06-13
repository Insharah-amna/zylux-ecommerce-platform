import {createSlice} from '@reduxjs/toolkit';
import {CategoriesState} from '@/types/redux';

const defaultState: CategoriesState = {
  list: [],
};

const slice = createSlice({
  name: 'categories',
  initialState: defaultState,
  reducers: {
    setCategories(state, action) {
      state.list = action.payload;
    },
    resetCategoriesSlice: () => defaultState,
  },
});

export default slice.reducer;

export const actions = slice.actions;

export const getCategories = (state: {categories: CategoriesState}) =>
  state.categories.list;
