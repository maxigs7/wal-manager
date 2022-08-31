import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { es } from '@i18n';

export type SignInFormType = { email: string; password: string };
export type SignInFormProps = UseFormReturn<SignInFormType>;

const Form: React.FC<SignInFormProps> = ({ formState: { errors }, register }) => (
  <>
    <FormControl isInvalid={!!errors.email}>
      <FormLabel htmlFor="email">{es.auth.signIn.form.email}</FormLabel>
      <Input
        id="email"
        placeholder={es.auth.signIn.form.email}
        {...register('email', {
          required: 'Este campo es requerido.',
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
          required: 'Este campo es requerido.',
        })}
      />
      <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
    </FormControl>
  </>
);

export default Form;
