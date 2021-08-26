import { Category } from '@app/api/categories';
import { CategoryType } from '@app/api/common';

export const CREATE_CATEGORY_START = '[Category] Create Start';
export const UPDATE_CATEGORY_START = '[Category] Update Start';
export const DELETE_CATEGORY_START = '[Category] Delete Start';

export const CREATE_CATEGORY_END = '[Category] Create End';
export const UPDATE_CATEGORY_END = '[Category] Update End';
export const DELETE_CATEGORY_END = '[Category] Delete End';

export const SELECT_CATEGORY = '[Category] Select';
export const SELECT_CATEGORY_TYPE = '[Category] Select Type';

type PageCategoryKind =
  | typeof CREATE_CATEGORY_END
  | typeof CREATE_CATEGORY_START
  | typeof DELETE_CATEGORY_END
  | typeof DELETE_CATEGORY_START
  | typeof SELECT_CATEGORY
  | typeof SELECT_CATEGORY_TYPE
  | typeof UPDATE_CATEGORY_END
  | typeof UPDATE_CATEGORY_START;

export type DeletePayload = { id: string };
export type UpdatePayload = { id: string };
export type SelectPayload = { category: Category };
export type SelectTypePayload = { type: CategoryType };

type PageCategoryPayload = DeletePayload | UpdatePayload | SelectPayload | SelectTypePayload;

export type PageCategoryAction = { type: PageCategoryKind; payload?: PageCategoryPayload };
