import { Translate } from 'next-translate';
import { object, string, InferType } from 'yup';

export const resetPasswordRequestFormTypeSchema = (t: Translate) =>
  object({
    email: string().email(t('common:validation.email')).required(t('common:validation.required')),
  }).required();

export type ResetPasswordRequestFormType = InferType<
  ReturnType<typeof resetPasswordRequestFormTypeSchema>
>;
