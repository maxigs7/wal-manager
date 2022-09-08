import { VStack, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { es } from '@i18n';

import {
  AuthError,
  ResetPasswordRequestForm,
  ResetPasswordRequestFormType,
} from '../../components';
import { useResetPasswordRequest } from '../../hooks';

const Container: React.FC = () => {
  const { isError, isLoading, mutateAsync } = useResetPasswordRequest();
  const form = useForm<ResetPasswordRequestFormType>();

  const resetPasswordHandler = async (form: ResetPasswordRequestFormType) => {
    try {
      await mutateAsync(form.email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack as="form" maxW="xs" onSubmit={form.handleSubmit(resetPasswordHandler)} w="full">
      {isError && <AuthError>{es.auth.resetPassword.error}</AuthError>}
      <ResetPasswordRequestForm {...form} />
      <Button
        colorScheme="accent"
        isLoading={isLoading}
        mt={{ base: 12, sm: 6 }}
        mx={2}
        type="submit"
        w="full"
      >
        {es.auth.resetPassword.requestAction}
      </Button>
    </VStack>
  );
};

export default Container;
