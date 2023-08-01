import { Translate } from 'next-translate';
import { object, string, InferType, ref } from 'yup';

import { MIN_LOWERCASE, MIN_NUMBERS, MIN_SYMBOLS, MIN_UPPERCASE } from './password';

export const signUpFormSchema = (t: Translate) =>
  object({
    email: string().email().required(t('common:validation.required')),
    password: string()
      .min(8, t('common:validation.password.min'))
      .test({
        name: 'password',
        test(value, ctx) {
          if ((value?.match(/[a-z]/g) || []).length < MIN_LOWERCASE) {
            return ctx.createError({ message: t('common:validation.password.minLowercase') });
          }
          if ((value?.match(/[A-Z]/g) || []).length < MIN_UPPERCASE) {
            return ctx.createError({ message: t('common:validation.password.minUppercase') });
          }
          if ((value?.match(/[0-9]/g) || []).length < MIN_NUMBERS) {
            return ctx.createError({ message: t('common:validation.password.minNumbers') });
          }
          if ((value?.match(/[^a-zA-Z0-9\s]/g) || []).length < MIN_SYMBOLS) {
            return ctx.createError({ message: t('common:validation.password.minSymbols') });
          }

          return true;
        },
      })
      .required(t('common:validation.required')),
    confirmPassword: string()
      .oneOf([ref('password')], t('common:validation.passwordMismatch'))
      .required(t('common:validation.required')),
  }).required();

export type SignUpFormType = InferType<ReturnType<typeof signUpFormSchema>>;
