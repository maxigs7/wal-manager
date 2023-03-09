import { useForm, yupResolver } from 'react-hook-form';

import { es } from '@/i18n';
import { Button } from '@/shared/components';

import { ResetPasswordRequestForm } from '../../components';
import { ResetPasswordRequestFormType, resetPasswordRequestFormTypeSchema } from '../../models';
import { FormContainer } from './form-container';

const ResetPasswordRequest: React.FC = () => {
  const form = useForm<ResetPasswordRequestFormType>({
    resolver: yupResolver(resetPasswordRequestFormTypeSchema),
  });

  return (
    <FormContainer handleSubmit={form.handleSubmit}>
      <ResetPasswordRequestForm {...form} />

      <Button isLoading={form.formState.isSubmitting} type="submit">
        {es.auth.resetPassword.requestAction}
      </Button>
    </FormContainer>
  );
};

export { ResetPasswordRequest };
