import { Category } from '@app/api/categories';
import { CategoryType } from '@app/api/common';

export const CREATE_CATEGORY = '[CATEGORY] Create Category';
export const EDIT_CATEGORY = '[CATEGORY] Edit Category';
export const SELECT_CATEGORY = '[CATEGORY] Select Category';
export const SELECT_CATEGORY_TYPE = '[CATEGORY] Select Category Type';

type PageCategoryKind =
  | typeof CREATE_CATEGORY
  | typeof EDIT_CATEGORY
  | typeof SELECT_CATEGORY
  | typeof SELECT_CATEGORY_TYPE;

export type EditCategoryPayload = { id: string };
export type SelectCategoryPayload = { category: Category };
export type SelectCategoryTypePayload = { type: CategoryType };

type PageCategoryPayload = EditCategoryPayload | SelectCategoryPayload | SelectCategoryTypePayload;

export type PageCategoryAction = { type: PageCategoryKind; payload?: PageCategoryPayload };
