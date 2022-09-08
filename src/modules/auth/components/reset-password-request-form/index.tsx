import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';

import { es } from '@i18n';

export type ResetPasswordRequestFormType = { email: string };
export type ResetPasswordRequestFormProps = UseFormReturn<ResetPasswordRequestFormType>;

const Form: React.FC<ResetPasswordRequestFormProps> = ({ formState: { errors }, register }) => (
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
);

export default Form;
