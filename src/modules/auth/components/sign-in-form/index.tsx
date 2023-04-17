import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';

import { es } from '@/i18n';

import { SignInFormType } from '../../models';

export type SignInFormProps = UseFormReturn<SignInFormType>;

const SignInForm: React.FC<SignInFormProps> = ({ formState: { errors }, register }) => (
  <>
    <FormControl isInvalid={!!errors.email}>
      <FormLabel htmlFor="email">{es.auth.signIn.form.email}</FormLabel>
      <Input
        id="email"
        placeholder={es.auth.signIn.form.email}
        {...register('email', {
          required: es.common.validation.required,
          pattern: /^\S+@\S+$/i,
        })}
      />
      <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
    </FormControl>

    <FormControl isInvalid={!!errors.password}>
      <FormLabel htmlFor="password">{es.auth.signIn.form.password}</FormLabel>
      <Input
        id="password"
        placeholder={es.auth.signIn.form.password}
        type="password"
        {...register('password', {
          required: es.common.validation.required,
        })}
      />
      <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
    </FormControl>
  </>
);

export { SignInForm };
