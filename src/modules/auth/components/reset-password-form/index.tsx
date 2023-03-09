import { UseFormReturn } from 'react-hook-form';

import { es } from '@/i18n';
import { FormControl, FormErrorMessage, Input } from '@/shared/components';

import { ResetPasswordConfirmFormType } from '../../models/reset-password-confirm-form';

export type ResetPasswordConfirmFormProps = UseFormReturn<ResetPasswordConfirmFormType>;

const ResetPasswordConfirmForm: React.FC<ResetPasswordConfirmFormProps> = ({
  formState: { errors },
  register,
}) => (
  <>
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

export { ResetPasswordConfirmForm };
