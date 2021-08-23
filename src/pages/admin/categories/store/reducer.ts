import {
  CREATE_CATEGORY,
  EditCategoryPayload,
  EDIT_CATEGORY,
  PageCategoryAction,
  SelectCategoryPayload,
  SelectCategoryTypePayload,
  SELECT_CATEGORY,
  SELECT_CATEGORY_TYPE,
} from './actions';
import { IState } from './state';

export const reducer = (state: IState, action: PageCategoryAction): IState => {
  const { type } = action;
  switch (type) {
    case CREATE_CATEGORY:
      return { ...state };
    case EDIT_CATEGORY: {
      const { id } = action.payload as EditCategoryPayload;
      return { ...state, categoryId: id };
    }
    case SELECT_CATEGORY: {
      const { category } = action.payload as SelectCategoryPayload;
      return { ...state, selectedCategory: category };
    }
    case SELECT_CATEGORY_TYPE: {
      const { type } = action.payload as SelectCategoryTypePayload;
      return { ...state, selectedType: type, selectedCategory: undefined };
    }
    default:
      return state;
  }
};
