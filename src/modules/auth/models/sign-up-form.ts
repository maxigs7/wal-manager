import { object, string, InferType, ref } from 'yup';

import { es } from '@/i18n';

import { MIN_LOWERCASE, MIN_NUMBERS, MIN_SYMBOLS, MIN_UPPERCASE } from './password';

export const signUpFormSchema = object({
  email: string().email().required(es.common.validation.required),
  password: string()
    .min(8, es.auth.validation.password.min)
    .test({
      name: 'password',
      test(value, ctx) {
        if ((value?.match(/[a-z]/g) || []).length < MIN_LOWERCASE) {
          return ctx.createError({ message: es.auth.validation.password.minLowercase });
        }
        if ((value?.match(/[A-Z]/g) || []).length < MIN_UPPERCASE) {
          return ctx.createError({ message: es.auth.validation.password.minUppercase });
        }
        if ((value?.match(/[0-9]/g) || []).length < MIN_NUMBERS) {
          return ctx.createError({ message: es.auth.validation.password.minNumbers });
        }
        if ((value?.match(/[^a-zA-Z0-9\s]/g) || []).length < MIN_SYMBOLS) {
          return ctx.createError({ message: es.auth.validation.password.minSymbols });
        }

        return true;
      },
    })
    .required(es.common.validation.required),
  confirmPassword: string()
    .oneOf([ref('password')], es.auth.validation.passwordMismatch)
    .required(es.common.validation.required),
}).required();

export type SignUpFormType = InferType<typeof signUpFormSchema>;
