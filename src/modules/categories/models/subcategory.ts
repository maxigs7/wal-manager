import { object, string, InferType } from 'yup';

import { es } from '@/i18n';

import { UseIsNameUniqueReturn } from '../query';

export const subcategoryFormSchema = (
  isUnique: UseIsNameUniqueReturn,
  parentId: string,
  categoryId?: string,
) =>
  object()
    .shape({
      name: string()
        .test({
          name: 'duplicateName',
          test(value, ctx) {
            return isUnique(value, categoryId, parentId).then((isUnique) => {
              if (!isUnique) {
                return ctx.createError({ message: es.category.toast.uniqueError });
              }
              return true;
            });
          },
        })
        .required(es.common.validation.required),
      parentId: string().required(es.common.validation.required),
      userId: string().required(es.common.validation.required),
    })
    .required();

export type SubcategoryFormType = InferType<ReturnType<typeof subcategoryFormSchema>>;
