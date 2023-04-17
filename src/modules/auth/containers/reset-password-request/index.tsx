import { Button } from '@chakra-ui/react';
import { useForm, yupResolver } from 'react-hook-form';

import { es } from '@/i18n';

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

      <Button
        colorScheme="accent"
        isLoading={form.formState.isSubmitting}
        maxW="sm"
        type="submit"
        w="full"
      >
        {es.auth.resetPassword.requestAction}
      </Button>
    </FormContainer>
  );
};

export { ResetPasswordRequest };
