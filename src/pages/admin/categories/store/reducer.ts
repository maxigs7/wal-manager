import {
  CREATE_CATEGORY_START,
  DELETE_CATEGORY_END,
  DELETE_CATEGORY_START,
  DeletePayload,
  PageCategoryAction,
  SELECT_CATEGORY_TYPE,
  SELECT_CATEGORY,
  SelectPayload,
  SelectTypePayload,
  UPDATE_CATEGORY_END,
  UPDATE_CATEGORY_START,
  UpdatePayload,
} from './actions';
import { IState } from './state';

export const reducer = (state: IState, action: PageCategoryAction): IState => {
  const { type } = action;
  switch (type) {
    case CREATE_CATEGORY_START:
      return { ...state, categoryId: undefined };
    case DELETE_CATEGORY_END:
      return { ...state, categoryId: undefined, selected: undefined };
    case DELETE_CATEGORY_START: {
      const { id } = action.payload as DeletePayload;
      return { ...state, categoryId: id };
    }
    case SELECT_CATEGORY: {
      const { category } = action.payload as SelectPayload;
      return { ...state, selected: category, categoryId: undefined };
    }
    case SELECT_CATEGORY_TYPE: {
      const { type } = action.payload as SelectTypePayload;
      return { ...state, selectedType: type, selected: undefined, categoryId: undefined };
    }
    case UPDATE_CATEGORY_END:
      return { ...state, categoryId: undefined };
    case UPDATE_CATEGORY_START: {
      const { id } = action.payload as UpdatePayload;
      return { ...state, categoryId: id };
    }
    default:
      return state;
  }
};
