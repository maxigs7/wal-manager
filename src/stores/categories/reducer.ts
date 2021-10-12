import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit';

import { defaultAsync } from '../state';
import { addFailCase, addLoadingCase, addSuccessCase } from '../util';
import {
  CATEGORIES_REQUEST_FAIL,
  CATEGORIES_REQUEST_SUCCESS,
  CATEGORIES_REQUEST,
  CATEGORY_CREATE_REQUEST_FAIL,
  CATEGORY_CREATE_REQUEST_SUCCESS,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_REQUEST,
  CATEGORY_REQUEST_FAIL,
  CATEGORY_REQUEST_SUCCESS,
  CATEGORY_RESET,
  CATEGORY_SELECTED,
  CATEGORY_SELECTED_BY_ID,
  CATEGORY_TYPE_SELECTED,
  SUBCATEGORIES_REQUEST_FAIL,
  SUBCATEGORIES_REQUEST_SUCCESS,
  SUBCATEGORIES_REQUEST,
  CATEGORY_UPDATE_REQUEST_FAIL,
  CATEGORY_UPDATE_REQUEST_SUCCESS,
} from './actions';
import { initialState, IState } from './state';

const reducer = createReducer(initialState, (builder: ActionReducerMapBuilder<IState>) => {
  addLoadingCase(builder, CATEGORIES_REQUEST, (state: IState) => state.categories);
  addFailCase(builder, CATEGORIES_REQUEST_FAIL, (state: IState) => state.categories);
  addSuccessCase(builder, CATEGORIES_REQUEST_SUCCESS, (state: IState) => state.categories);
  addLoadingCase(builder, SUBCATEGORIES_REQUEST, (state: IState) => state.subCategories);
  addFailCase(builder, SUBCATEGORIES_REQUEST_FAIL, (state: IState) => state.subCategories);
  addSuccessCase(builder, SUBCATEGORIES_REQUEST_SUCCESS, (state: IState) => state.subCategories);
  addLoadingCase(builder, CATEGORY_REQUEST, (state: IState) => state.category);
  addFailCase(builder, CATEGORY_REQUEST_FAIL, (state: IState) => state.category);
  addSuccessCase(builder, CATEGORY_REQUEST_SUCCESS, (state: IState) => state.category);
  addLoadingCase(builder, CATEGORY_CREATE_REQUEST, (state: IState) => state.categoryAction);
  addFailCase(builder, CATEGORY_CREATE_REQUEST_FAIL, (state: IState) => state.categoryAction);
  addSuccessCase(builder, CATEGORY_CREATE_REQUEST_SUCCESS, (state: IState) => state.categoryAction);
  addFailCase(builder, CATEGORY_UPDATE_REQUEST_FAIL, (state: IState) => state.categoryAction);
  addSuccessCase(builder, CATEGORY_UPDATE_REQUEST_SUCCESS, (state: IState) => state.categoryAction);

  builder
    .addCase(CATEGORY_RESET, (state) => {
      state.categoryAction = { ...defaultAsync };
      state.category = { ...defaultAsync };
    })
    .addCase(CATEGORY_SELECTED, (state, action) => {
      state.selected = action.payload;
    })
    .addCase(CATEGORY_SELECTED_BY_ID, (state, action) => {
      const category = state.categories.data?.find((cat) => cat.id === action.payload);
      if (category) {
        state.selected = category;
      }
    })
    .addCase(CATEGORY_TYPE_SELECTED, (state, action) => {
      state.type = action.payload;
    });
});

export default reducer;
