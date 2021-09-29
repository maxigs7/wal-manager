import { createReducer } from '@reduxjs/toolkit';

import {
  REQUEST_CATEGORIES,
  REQUEST_CATEGORIES_FAIL,
  REQUEST_CATEGORIES_SUCCESS,
  REQUEST_SUBCATEGORIES,
  REQUEST_SUBCATEGORIES_FAIL,
  REQUEST_SUBCATEGORIES_SUCCESS,
  SELECT_CATEGORY,
  SELECT_CATEGORY_TYPE,
} from './actions';
import { initialState } from './state';

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(REQUEST_CATEGORIES, (state) => {
      state.categories.isLoading = true;
      state.categories.status = 'loading';
    })
    .addCase(REQUEST_CATEGORIES_FAIL, (state, action) => {
      state.categories.isLoading = false;
      state.categories.error = action.payload;
      state.categories.status = 'error';
    })
    .addCase(REQUEST_CATEGORIES_SUCCESS, (state, action) => {
      state.categories.isLoading = false;
      state.categories.data = action.payload;
      state.categories.status = 'success';
    })
    .addCase(REQUEST_SUBCATEGORIES, (state) => {
      state.subCategories.isLoading = true;
      state.subCategories.status = 'loading';
    })
    .addCase(REQUEST_SUBCATEGORIES_FAIL, (state, action) => {
      state.subCategories.isLoading = false;
      state.subCategories.error = action.payload;
      state.subCategories.status = 'error';
    })
    .addCase(REQUEST_SUBCATEGORIES_SUCCESS, (state, action) => {
      state.subCategories.isLoading = false;
      state.subCategories.data = action.payload;
      state.subCategories.status = 'success';
    })
    .addCase(SELECT_CATEGORY, (state, action) => {
      state.selected = action.payload;
    })
    .addCase(SELECT_CATEGORY_TYPE, (state, action) => {
      state.type = action.payload;
    });
});

export default reducer;
