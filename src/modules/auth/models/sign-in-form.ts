import { Translate } from 'next-translate';
import { object, string, InferType } from 'yup';

export const signInFormSchema = (t: Translate) =>
  object({
    email: string().email(t('common:validation.email')).required(t('common:validation.required')),
    password: string().required(t('common:validation.required')),
  }).required();

export type SignInFormType = InferType<ReturnType<typeof signInFormSchema>>;
