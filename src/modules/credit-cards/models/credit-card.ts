import { object, string, mixed, InferType } from 'yup';

import { es } from '@/i18n';
import { CreditCardType } from '@/models';

import { UseIsNameUniqueReturn } from '../query';

export const creditCardFormSchema = (isUnique: UseIsNameUniqueReturn, creditCardId?: string) =>
  object()
    .shape({
      name: string()
        .test({
          name: 'duplicateName',
          test(value, ctx) {
            return isUnique(value, creditCardId).then((isUnique) => {
              if (!isUnique) {
                return ctx.createError({ message: es.creditCard.toast.uniqueError });
              }
              return true;
            });
          },
        })
        .required(es.common.validation.required),
      type: mixed<CreditCardType>().required(es.common.validation.required),
      userId: string().required(es.common.validation.required),
    })
    .required();

export type CreditCardFormType = InferType<ReturnType<typeof creditCardFormSchema>>;
