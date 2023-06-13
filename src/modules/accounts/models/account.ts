import { object, string, InferType } from 'yup';

import { es } from '@/i18n';
import { AccountInsert } from '@/models';

import { UseIsUniqueReturn } from '../query';

export const accountFormSchema = (isUnique: UseIsUniqueReturn, accountId?: string) =>
  object<AccountInsert>({
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
  }).required();

export type AccountFormType = InferType<ReturnType<typeof accountFormSchema>>;
