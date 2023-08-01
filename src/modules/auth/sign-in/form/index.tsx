'use client';

import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';

import { SignInFormType } from '../../models';

const SignInForm: React.FC = () => {
  const { t } = useTranslation('auth-sign-in');
  const {
    formState: { errors },
    register,
  } = useFormContext<SignInFormType>();

  return (
    <>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">{t('form.email')}</FormLabel>
        <Input id="email" placeholder={t('form.emailPlaceholder')} {...register('email')} />
        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">{t('form.password')}</FormLabel>
        <Input
          id="password"
          placeholder={t('form.passwordPlaceholder')}
          type="password"
          {...register('password')}
        />
        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export { SignInForm };
