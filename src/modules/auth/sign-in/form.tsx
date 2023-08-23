'use client';

import { useFormContext } from 'react-hook-form';

import TextFieldControl from '@/m/shared/form-control/input';

import { SignInFormType } from '../models';

type SignInFormProps = {
  translations: Record<'email' | 'password', string>;
};

const SignInForm: React.FC<SignInFormProps> = ({ translations }) => {
  const { control } = useFormContext<SignInFormType>();

  return (
    <>
      <TextFieldControl control={control} label={translations.email} name="email" type="email" />

      <TextFieldControl
        control={control}
        label={translations.password}
        name="password"
        type="password"
      />
    </>
  );
};

export default SignInForm;
