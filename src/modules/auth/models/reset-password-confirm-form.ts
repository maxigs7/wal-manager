import { object, string, InferType, ref } from 'yup';

import { useScopedI18n } from '@/i18n/client';

import { MIN_LOWERCASE, MIN_NUMBERS, MIN_SYMBOLS, MIN_UPPERCASE } from './password';

export const resetPasswordConfirmFormSchema = (t: ReturnType<typeof useScopedI18n<'common'>>) =>
  object({
    password: string()
      .min(8, t('validation.password.min'))
      .test({
        name: 'password',
        test(value, ctx) {
          if ((value?.match(/[a-z]/g) || []).length < MIN_LOWERCASE) {
            return ctx.createError({ message: t('validation.password.minLowercase') });
          }
          if ((value?.match(/[A-Z]/g) || []).length < MIN_UPPERCASE) {
            return ctx.createError({ message: t('validation.password.minUppercase') });
          }
          if ((value?.match(/[0-9]/g) || []).length < MIN_NUMBERS) {
            return ctx.createError({ message: t('validation.password.minNumbers') });
          }
          if ((value?.match(/[^a-zA-Z0-9\s]/g) || []).length < MIN_SYMBOLS) {
            return ctx.createError({ message: t('validation.password.minSymbols') });
          }

          return true;
        },
      })
      .required(t('validation.required')),
    confirmPassword: string()
      .oneOf([ref('password')], t('validation.passwordMismatch'))
      .required(t('validation.required')),
  }).required();

export type ResetPasswordConfirmFormType = InferType<
  ReturnType<typeof resetPasswordConfirmFormSchema>
>;
