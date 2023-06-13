'use client';

import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { es } from '@/i18n';

import { SignUpFormType } from '../../models';

const SignUpForm: React.FC = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext<SignUpFormType>();

  return (
    <>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">{es.auth.signUp.form.email}</FormLabel>
        <Input
          id="email"
          placeholder={es.auth.signUp.form.emailPlaceholder}
          {...register('email')}
        />
        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">{es.auth.signUp.form.password}</FormLabel>
        <Input
          id="password"
          placeholder={es.auth.signUp.form.passwordPlaceholder}
          type="password"
          {...register('password')}
        />
        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.confirmPassword}>
        <FormLabel htmlFor="confirm-password">{es.auth.signUp.form.confirmPassword}</FormLabel>
        <Input
          id="confirm-password"
          placeholder={es.auth.signUp.form.confirmPasswordPlaceholder}
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

export { SignUpForm };
