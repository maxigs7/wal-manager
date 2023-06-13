'use client';

import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { es } from '@/i18n';

import { SignInFormType } from '../../models';

const SignInForm: React.FC = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext<SignInFormType>();

  return (
    <>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">{es.auth.signIn.form.email}</FormLabel>
        <Input
          id="email"
          placeholder={es.auth.signIn.form.emailPlaceholder}
          {...register('email')}
        />
        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">{es.auth.signIn.form.password}</FormLabel>
        <Input
          id="password"
          placeholder={es.auth.signIn.form.passwordPlaceholder}
          type="password"
          {...register('password')}
        />
        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export { SignInForm };
