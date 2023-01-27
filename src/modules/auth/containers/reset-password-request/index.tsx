import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { clearTimeout } from 'timers';

import { VStack, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { es } from '@i18n';

import {
  AuthMessage,
  ResetPasswordRequestForm,
  ResetPasswordRequestFormType,
} from '../../components';
import { useResetPasswordRequest } from '../../hooks';

const Container: React.FC = () => {
  const router = useRouter();
  const { isError, isLoading, isSuccess, mutateAsync } = useResetPasswordRequest();
  const form = useForm<ResetPasswordRequestFormType>();

  const resetPasswordHandler = async (form: ResetPasswordRequestFormType) => {
    try {
      await mutateAsync(form.email);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isSuccess) {
      timeout = setTimeout(() => {
        router.push('/auth/sign-in');
      }, 10000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isSuccess, router]);

  return (
    <VStack as="form" maxW="xs" onSubmit={form.handleSubmit(resetPasswordHandler)} w="full">
      {isError && <AuthMessage>{es.auth.resetPassword.requestError}</AuthMessage>}
      {isSuccess && (
        <AuthMessage type="success">{es.auth.resetPassword.requestSuccess}</AuthMessage>
      )}
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
