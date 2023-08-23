'use client';

import { useFormContext } from 'react-hook-form';

import TextFieldControl from '@/m/shared/form-control/input';

import { SignUpFormType } from '../models';

type SignUpFormProps = {
  translations: Record<'email' | 'password' | 'confirmPassword', string>;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ translations }) => {
  const { control } = useFormContext<SignUpFormType>();

  return (
    <>
      <TextFieldControl control={control} label={translations.email} name="email" type="email" />

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

export default SignUpForm;
