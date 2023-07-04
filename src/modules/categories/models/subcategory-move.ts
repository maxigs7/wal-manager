import { object, string, InferType } from 'yup';

import { es } from '@/i18n';

export const subcategoryMoveFormSchema = object()
  .shape({
    id: string().required(es.common.validation.required),
    parentId: string().required(es.common.validation.required),
  })
  .required();

export type SubcategoryMoveFormType = InferType<typeof subcategoryMoveFormSchema>;
