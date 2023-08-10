'use client';

import { Input } from '@nextui-org/input';
import { useFormContext } from 'react-hook-form';

import { FormControl } from '@/m/shared/form/form-control';

import { SignUpFormType } from '../models';

type SignUpFormProps = {
  translations: Record<
    | 'email'
    | 'emailPlaceholder'
    | 'password'
    | 'passwordPlaceholder'
    | 'confirmPassword'
    | 'confirmPasswordPlaceholder',
    string
  >;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ translations }) => {
  const {
    formState: { errors },
    register,
  } = useFormContext<SignUpFormType>();

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
      <FormControl>
        <Input
          errorMessage={errors?.confirmPassword?.message}
          label={translations.confirmPassword}
          labelPlacement="outside"
          placeholder={translations.confirmPasswordPlaceholder}
          type="password"
          validationState={errors?.confirmPassword?.message ? 'invalid' : 'valid'}
          {...register('confirmPassword')}
        />
      </FormControl>
    </>
  );
};

export { SignUpForm };
