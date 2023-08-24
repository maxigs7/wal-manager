'use client';

import { useFormContext } from 'react-hook-form';

import TextFieldControl from '@/m/shared/form-control/input';

import { ResetPasswordConfirmFormType } from '../../models';

type ResetPasswordConfirmFormProps = {
  translations: Record<'password' | 'confirmPassword', string>;
};
const ResetPasswordConfirmForm: React.FC<ResetPasswordConfirmFormProps> = ({ translations }) => {
  const { control } = useFormContext<ResetPasswordConfirmFormType>();
  return (
    <>
      <TextFieldControl
        control={control}
        label={translations.password}
        name="password"
        type="password"
      />

      <TextFieldControl
        control={control}
        label={translations.confirmPassword}
        name="confirmPassword"
        type="password"
      />
    </>
  );
};
export { ResetPasswordConfirmForm };
