import { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

export type SignUpFormType = { email: string; password: string; confirmPassword: string };
export type SignUpFormProps = UseFormReturn<SignUpFormType>;

const Form: React.FC<SignUpFormProps> = ({ formState: { errors }, register, watch }) => {
  const password = useRef({});
  password.current = watch('password', '');
  return (
    <>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          placeholder="Email"
          {...register('email', {
            required: 'Este campo es requerido.',
            pattern: /^\S+@\S+$/i,
          })}
        />
        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          placeholder="Password"
          type="password"
          {...register('password', {
            required: 'Este campo es requerido.',
          })}
        />
        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.confirmPassword}>
        <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
        <Input
          id="confirm-password"
          placeholder="Confirm Password"
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

export { Form };
