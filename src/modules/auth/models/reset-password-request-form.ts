import { object, string, InferType } from 'yup';

import { useScopedI18n } from '@/i18n/client';

export const resetPasswordRequestFormTypeSchema = (t: ReturnType<typeof useScopedI18n<'common'>>) =>
  object({
    email: string().email(t('validation.email')).required(t('validation.required')),
  }).required();

export type ResetPasswordRequestFormType = InferType<
  ReturnType<typeof resetPasswordRequestFormTypeSchema>
>;
