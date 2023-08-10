'use client';

import { Input } from '@nextui-org/input';
import { useFormContext } from 'react-hook-form';

import { FormControl } from '@/m/shared/form/form-control';

import { SignInFormType } from '../models';

type SignInFormProps = {
  translations: Record<'email' | 'emailPlaceholder' | 'password' | 'passwordPlaceholder', string>;
};

const SignInForm: React.FC<SignInFormProps> = ({ translations }) => {
  const {
    formState: { errors },
    register,
  } = useFormContext<SignInFormType>();

  return (
    <>
      <FormControl>
        <Input
          errorMessage={errors?.email?.message}
          label={translations.email}
          labelPlacement="outside"
          placeholder={translations.emailPlaceholder}
          type="email"
          validationState={errors?.email?.message ? 'invalid' : 'valid'}
          {...register('email')}
        />
      </FormControl>
      <FormControl>
        <Input
          errorMessage={errors?.password?.message}
          label={translations.password}
          labelPlacement="outside"
          placeholder={translations.passwordPlaceholder}
          type="password"
          validationState={errors?.password?.message ? 'invalid' : 'valid'}
          {...register('password')}
        />
      </FormControl>
    </>
  );
};

export { SignInForm };
