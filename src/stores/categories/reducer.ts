import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit';

import { addFailCase, addLoadingCase, addSuccessCase } from '../util';
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
import { initialState, IState } from './state';

const reducer = createReducer(initialState, (builder: ActionReducerMapBuilder<IState>) => {
  addLoadingCase(builder, REQUEST_CATEGORIES, (state: IState) => state.categories);
  addFailCase(builder, REQUEST_CATEGORIES_FAIL, (state: IState) => state.categories);
  addSuccessCase(builder, REQUEST_CATEGORIES_SUCCESS, (state: IState) => state.categories);
  addLoadingCase(builder, REQUEST_SUBCATEGORIES, (state: IState) => state.subCategories);
  addFailCase(builder, REQUEST_SUBCATEGORIES_FAIL, (state: IState) => state.subCategories);
  addSuccessCase(builder, REQUEST_SUBCATEGORIES_SUCCESS, (state: IState) => state.subCategories);

  builder
    .addCase(SELECT_CATEGORY, (state, action) => {
      state.selected = action.payload;
    })
    .addCase(SELECT_CATEGORY_TYPE, (state, action) => {
      state.type = action.payload;
    });
});

export default reducer;
