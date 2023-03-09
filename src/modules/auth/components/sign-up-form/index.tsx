import { UseFormReturn } from 'react-hook-form';

import { es } from '@/i18n';
import { FormControl, FormErrorMessage, Input } from '@/shared/components';

export type SignUpFormType = { email: string; password: string; confirmPassword: string };
export type SignUpFormProps = UseFormReturn<SignUpFormType>;

const SignUpForm: React.FC<SignUpFormProps> = ({ formState: { errors }, register, watch }) => {
  return (
    <>
      <FormControl isInvalid={!!errors.email}>
        <Input id="email" placeholder={es.auth.signUp.form.email} {...register('email')}>
          {es.auth.signUp.form.email}
        </Input>
        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <Input id="password" type="password" {...register('password')}>
          {es.auth.signUp.form.password}
        </Input>
        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.confirmPassword}>
        <Input id="confirm-password" type="password" {...register('confirmPassword')}>
          {es.auth.signUp.form.confirmPassword}
        </Input>
        <FormErrorMessage>
          {errors.confirmPassword && errors.confirmPassword.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export { SignUpForm };
