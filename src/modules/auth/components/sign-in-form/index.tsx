import { UseFormReturn } from 'react-hook-form';

import { es } from '@/i18n';
import { FormControl, FormErrorMessage, Input } from '@/shared/components';

import { SignInFormType } from '../../models';

export type SignInFormProps = UseFormReturn<SignInFormType>;

const SignInForm: React.FC<SignInFormProps> = ({ formState: { errors }, register }) => (
  <>
    <FormControl isInvalid={!!errors.email}>
      <Input id="email" type="email" {...register('email')}>
        {es.auth.signIn.form.email}
      </Input>
      <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
    </FormControl>
    <FormControl isInvalid={!!errors.password}>
      <Input id="password" type="password" {...register('password')}>
        {es.auth.signIn.form.password}
      </Input>
      <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
    </FormControl>
  </>
);

export { SignInForm };
