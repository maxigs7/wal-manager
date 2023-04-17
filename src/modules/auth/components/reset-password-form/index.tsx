'use client';
import { useRef } from 'react';

import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';

import { es } from '@/i18n';

export type ResetPasswordConfirmFormType = { password: string; confirmPassword: string };
export type ResetPasswordConfirmFormProps = UseFormReturn<ResetPasswordConfirmFormType>;

const ResetPasswordConfirmForm: React.FC<ResetPasswordConfirmFormProps> = ({
  formState: { errors },
  register,
  watch,
}) => {
  const password = useRef({});
  password.current = watch('password', '');
  return (
    <>
      <FormControl isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">{es.auth.signUp.form.password}</FormLabel>
        <Input
          id="password"
          placeholder={es.auth.signUp.form.password}
          type="password"
          {...register('password', {
            required: es.common.validation.required,
          })}
        />
        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.confirmPassword}>
        <FormLabel htmlFor="confirm-password">{es.auth.signUp.form.confirmPassword}</FormLabel>
        <Input
          id="confirm-password"
          placeholder={es.auth.signUp.form.confirmPassword}
          type="password"
          {...register('confirmPassword', {
            required: es.common.validation.required,
            validate: (value) => value === password.current || es.auth.validation.passwordMismatch,
          })}
        />
        <FormErrorMessage>
          {errors.confirmPassword && errors.confirmPassword.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export { ResetPasswordConfirmForm };
