import { object, string, mixed, boolean, InferType } from 'yup';

import { es } from '@/i18n';
import { AccountType, Currency, QuotationType } from '@/models';

import { UseIsNameUniqueReturn } from '../query';

export const accountFormSchema = (isUnique: UseIsNameUniqueReturn, accountId?: string) =>
  object()
    .shape({
      currency: mixed<Currency>().optional(),
      isPrimary: boolean().optional(),
      name: string()
        .test({
          name: 'duplicateName',
          test(value, ctx) {
            return isUnique(value, accountId).then((isUnique) => {
              if (!isUnique) {
                return ctx.createError({ message: es.account.toast.uniqueError });
              }
              return true;
            });
          },
        })
        .required(es.common.validation.required),
      quotationId: mixed<QuotationType>().nullable(),
      type: mixed<AccountType>().required(es.common.validation.required),
      userId: string().required(es.common.validation.required),
    })
    .required();

export type AccountFormType = InferType<ReturnType<typeof accountFormSchema>>;
