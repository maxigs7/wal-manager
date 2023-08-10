import { object, string, InferType } from 'yup';

import { useScopedI18n } from '@/i18n/client';

export const signInFormSchema = (t: ReturnType<typeof useScopedI18n<'common'>>) =>
  object({
    email: string().email(t('validation.email')).required(t('validation.required')),
    password: string().required(t('validation.required')),
  }).required();

export type SignInFormType = InferType<ReturnType<typeof signInFormSchema>>;
