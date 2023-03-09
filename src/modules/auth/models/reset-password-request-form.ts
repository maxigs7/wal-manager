import { object, string, InferType } from 'yup';

import { es } from '@/i18n';

export const resetPasswordRequestFormTypeSchema = object({
  email: string().email(es.common.validation.email).required(es.common.validation.required),
}).required();

export type ResetPasswordRequestFormType = InferType<typeof resetPasswordRequestFormTypeSchema>;
