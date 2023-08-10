'use client';

import { Input } from '@nextui-org/input';
import { useFormContext } from 'react-hook-form';

import { FormControl } from '@/m/shared/form/form-control';

import { ResetPasswordConfirmFormType } from '../../models';

type ResetPasswordConfirmFormProps = {
  translations: Record<
    'password' | 'passwordPlaceholder' | 'confirmPassword' | 'confirmPasswordPlaceholder',
    string
  >;
};

const ResetPasswordConfirmForm: React.FC<ResetPasswordConfirmFormProps> = ({ translations }) => {
  const {
    formState: { errors },
    register,
  } = useFormContext<ResetPasswordConfirmFormType>();

  return (
    <>
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

export { ResetPasswordConfirmForm };
