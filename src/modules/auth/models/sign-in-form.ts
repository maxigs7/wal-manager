import { object, string, InferType } from 'yup';

import { es } from '@/i18n';

export const signInFormSchema = object({
  email: string().email(es.common.validation.email).required(es.common.validation.required),
  password: string().required(es.common.validation.required),
}).required();

export type SignInFormType = InferType<typeof signInFormSchema>;
