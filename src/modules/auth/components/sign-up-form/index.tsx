import { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { es } from '@i18n';

export type SignUpFormType = { email: string; password: string; confirmPassword: string };
export type SignUpFormProps = UseFormReturn<SignUpFormType>;

const Form: React.FC<SignUpFormProps> = ({ formState: { errors }, register, watch }) => {
  const password = useRef({});
  password.current = watch('password', '');
  return (
    <>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">{es.auth.signUp.form.email}</FormLabel>
        <Input
          id="email"
          placeholder={es.auth.signUp.form.email}
          {...register('email', {
            required: 'Este campo es requerido.',
            pattern: /^\S+@\S+$/i,
          })}
        />
        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">{es.auth.signUp.form.password}</FormLabel>
        <Input
          id="password"
          placeholder={es.auth.signUp.form.password}
          type="password"
          {...register('password', {
            required: 'Este campo es requerido.',
          })}
        />
        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.confirmPassword}>
        <FormLabel htmlFor="confirm-password">{es.auth.signUp.form.confirmPassword}</FormLabel>
        <Input
          id="confirm-password"
          placeholder={es.auth.signUp.form.confirmPassword}
          type="password"
          {...register('confirmPassword', {
            required: 'Este campo es requerido.',
            validate: (value) => value === password.current || 'Las contraseñas no coinciden',
          })}
        />
        <FormErrorMessage>
          {errors.confirmPassword && errors.confirmPassword.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default Form;
