import { VStack, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { es } from '@i18n';

import { AuthError, ResetPasswordForm, ResetPasswordConfirmFormType } from '../../components';
import { useUpdatePassword } from '../../hooks';

const Container: React.FC = () => {
  const { isError, isLoading, mutateAsync } = useUpdatePassword();
  const form = useForm<ResetPasswordConfirmFormType>();

  const resetPasswordHandler = async (form: ResetPasswordConfirmFormType) => {
    try {
      await mutateAsync(form.password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack as="form" maxW="xs" onSubmit={form.handleSubmit(resetPasswordHandler)} w="full">
      {isError && <AuthError>{es.auth.resetPassword.error}</AuthError>}
      <ResetPasswordForm {...form} />
      <Button
        colorScheme="accent"
        isLoading={isLoading}
        mt={{ base: 12, sm: 6 }}
        mx={2}
        type="submit"
        w="full"
      >
        {es.auth.resetPassword.confirmAction}
      </Button>
    </VStack>
  );
};

export default Container;
