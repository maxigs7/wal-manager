import { object, string, InferType } from 'yup';

import { es } from '@/i18n';

import { UseIsNameUniqueReturn } from '../query';

export const categoryFormSchema = (isUnique: UseIsNameUniqueReturn, categoryId?: string) =>
  object()
    .shape({
      color: string().required(es.common.validation.required).nullable(),
      icon: string().required(es.common.validation.required).nullable(),
      name: string()
        .test({
          name: 'duplicateName',
          test(value, ctx) {
            return isUnique(value, categoryId).then((isUnique) => {
              if (!isUnique) {
                return ctx.createError({ message: es.category.toast.uniqueError });
              }
              return true;
            });
          },
        })
        .required(es.common.validation.required),
      parentId: string().nullable(),
      userId: string().required(es.common.validation.required),
    })
    .required();

export type CategoryFormType = InferType<ReturnType<typeof categoryFormSchema>>;
