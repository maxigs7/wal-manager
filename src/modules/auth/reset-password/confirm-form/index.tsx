'use client';

import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { es } from '@/i18n';

import { ResetPasswordConfirmFormType } from '../../models';

const ResetPasswordConfirmForm: React.FC = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext<ResetPasswordConfirmFormType>();

  return (
    <>
      <FormControl isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">{es.auth.signUp.form.password}</FormLabel>
        <Input
          id="password"
          placeholder={es.auth.signUp.form.password}
          type="password"
          {...register('password')}
        />
        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.confirmPassword}>
        <FormLabel htmlFor="confirm-password">{es.auth.signUp.form.confirmPassword}</FormLabel>
        <Input
          id="confirm-password"
          placeholder={es.auth.signUp.form.confirmPassword}
          type="password"
          {...register('confirmPassword')}
        />
        <FormErrorMessage>
          {errors.confirmPassword && errors.confirmPassword.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export { ResetPasswordConfirmForm };
