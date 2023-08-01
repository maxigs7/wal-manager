'use client';

import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';

import { ResetPasswordRequestFormType } from '../../models';

const ResetPasswordRequestForm: React.FC = () => {
  const { t } = useTranslation('auth-reset-password');
  const {
    formState: { errors },
    register,
  } = useFormContext<ResetPasswordRequestFormType>();
  return (
    <FormControl isInvalid={!!errors.email}>
      <FormLabel htmlFor="email">{t('form.email')}</FormLabel>
      <Input id="email" placeholder={t('form.email')} {...register('email')} />
      <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
    </FormControl>
  );
};
export { ResetPasswordRequestForm };
