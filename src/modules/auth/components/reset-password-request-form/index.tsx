import { UseFormReturn } from 'react-hook-form';

import { es } from '@/i18n';
import { FormControl, FormErrorMessage, Input } from '@/shared/components';

import { ResetPasswordRequestFormType } from '../../models';

export type ResetPasswordRequestFormProps = UseFormReturn<ResetPasswordRequestFormType>;

const ResetPasswordRequestForm: React.FC<ResetPasswordRequestFormProps> = ({
  formState: { errors },
  register,
}) => (
  <FormControl isInvalid={!!errors.email}>
    <Input id="email" type="email" {...register('email')}>
      {es.auth.signIn.form.email}
    </Input>
    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
  </FormControl>
);

export { ResetPasswordRequestForm };
