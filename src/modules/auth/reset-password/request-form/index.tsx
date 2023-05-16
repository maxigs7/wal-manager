'use client';

import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { es } from '@/i18n';

import { ResetPasswordRequestFormType } from '../../models';

const ResetPasswordRequestForm: React.FC = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext<ResetPasswordRequestFormType>();
  return (
    <FormControl isInvalid={!!errors.email}>
      <FormLabel htmlFor="email">{es.auth.signIn.form.email}</FormLabel>
      <Input id="email" placeholder={es.auth.signIn.form.email} {...register('email')} />
      <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
    </FormControl>
  );
};
export { ResetPasswordRequestForm };
