import { Button } from '@chakra-ui/react';
import { useForm, yupResolver } from 'react-hook-form';

import { es } from '@/i18n';

import { ResetPasswordConfirmForm } from '../../components/reset-password-form';
import { resetPasswordConfirmFormSchema, ResetPasswordConfirmFormType } from '../../models';
import { FormContainer } from './form-container';

const ResetPasswordConfirm: React.FC = () => {
  const form = useForm<ResetPasswordConfirmFormType>({
    resolver: yupResolver(resetPasswordConfirmFormSchema),
  });

  return (
    <FormContainer handleSubmit={form.handleSubmit}>
      <ResetPasswordConfirmForm {...form} />

      <Button
        colorScheme="accent"
        isLoading={form.formState.isSubmitting}
        maxW="sm"
        type="submit"
        w="full"
      >
        {es.auth.resetPassword.confirmAction}
      </Button>
    </FormContainer>
  );
};

export { ResetPasswordConfirm };
