'use client';

import { Input } from '@nextui-org/input';
import { useFormContext } from 'react-hook-form';

import { FormControl } from '@/m/shared/form/form-control';

import { ResetPasswordRequestFormType } from '../../models';

type ResetPasswordRequestFormProps = {
  translations: Record<'email' | 'emailPlaceholder', string>;
};
const ResetPasswordRequestForm: React.FC<ResetPasswordRequestFormProps> = ({ translations }) => {
  const {
    formState: { errors },
    register,
  } = useFormContext<ResetPasswordRequestFormType>();
  return (
    <FormControl>
      <Input
        errorMessage={errors?.email?.message}
        label={translations.email}
        labelPlacement="outside"
        placeholder={translations.emailPlaceholder}
        type="email"
        validationState={errors?.email?.message ? 'invalid' : 'valid'}
        {...register('email')}
      />
    </FormControl>
  );
};
export { ResetPasswordRequestForm };
