import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { VStack, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { es } from '@/i18n';

import { AuthMessage, ResetPasswordForm, ResetPasswordConfirmFormType } from '../../components';
import { useUpdatePassword } from '../../hooks';


const Container: React.FC = () => {
  const router = useRouter();
  const { isError, isLoading, isSuccess, mutateAsync } = useUpdatePassword();
  const form = useForm<ResetPasswordConfirmFormType>();

  const resetPasswordHandler = async (form: ResetPasswordConfirmFormType) => {
    try {
      await mutateAsync(form.password);
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
      {isError && <AuthMessage>{es.auth.resetPassword.confirmError}</AuthMessage>}
      {isSuccess && (
        <AuthMessage type="success">{es.auth.resetPassword.requestSuccess}</AuthMessage>
      )}
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
