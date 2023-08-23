'use client';

import { useFormContext } from 'react-hook-form';

import TextFieldControl from '@/m/shared/form-control/input';

import { ResetPasswordRequestFormType } from '../../models';

type ResetPasswordRequestFormProps = {
  translations: Record<'email', string>;
};
const ResetPasswordRequestForm: React.FC<ResetPasswordRequestFormProps> = ({ translations }) => {
  const { control } = useFormContext<ResetPasswordRequestFormType>();
  return (
    <TextFieldControl control={control} label={translations.email} name="email" type="email" />
  );
};
export { ResetPasswordRequestForm };
