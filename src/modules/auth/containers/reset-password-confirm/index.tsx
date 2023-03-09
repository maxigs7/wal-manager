import { useForm, yupResolver } from 'react-hook-form';

import { es } from '@/i18n';
import { Button } from '@/shared/components';

import { ResetPasswordConfirmForm } from '../../components';
import { resetPasswordConfirmFormSchema, ResetPasswordConfirmFormType } from '../../models';
import { FormContainer } from './form-container';

const ResetPasswordConfirm: React.FC = () => {
  const form = useForm<ResetPasswordConfirmFormType>({
    resolver: yupResolver(resetPasswordConfirmFormSchema),
  });

  return (
    <FormContainer handleSubmit={form.handleSubmit}>
      <ResetPasswordConfirmForm {...form} />

      <Button isLoading={form.formState.isSubmitting} type="submit">
        {es.auth.resetPassword.confirmAction}
      </Button>
    </FormContainer>
  );
};

export { ResetPasswordConfirm };
