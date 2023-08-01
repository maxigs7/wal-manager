'use client';

import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';

import { SignUpFormType } from '../../models';

const SignUpForm: React.FC = () => {
  const { t } = useTranslation('auth-sign-up');
  const {
    formState: { errors },
    register,
  } = useFormContext<SignUpFormType>();

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

      <FormControl isInvalid={!!errors.confirmPassword}>
        <FormLabel htmlFor="confirm-password">{t('form.confirmPassword')}</FormLabel>
        <Input
          id="confirm-password"
          placeholder={t('form.confirmPasswordPlaceholder')}
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
