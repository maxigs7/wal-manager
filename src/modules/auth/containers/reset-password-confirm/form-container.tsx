import { useRouter } from 'next/navigation';
import { ComponentProps, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';
import { UseFormHandleSubmit } from 'react-hook-form';

import { es } from '@/i18n';
import { routes } from '@/routes';

import { AuthAlert } from '../../components';
import { useUpdatePassword } from '../../hooks';
import { ResetPasswordConfirmFormType } from '../../models';

type Props = Omit<ComponentProps<'form'>, 'onSubmit'> & {
  handleSubmit: UseFormHandleSubmit<ResetPasswordConfirmFormType>;
};

export const FormContainer: React.FC<Props> = ({ children, handleSubmit }) => {
  const router = useRouter();
  const { isError, isSuccess, mutateAsync } = useUpdatePassword();

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
        router.push(routes.auth.signIn);
      }, 10000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isSuccess, router]);

  return (
    <VStack
      as="form"
      gap="2"
      mx="auto"
      my="5"
      onSubmit={handleSubmit(resetPasswordHandler)}
      w="full"
    >
      {isError && <AuthAlert status="error">{es.auth.resetPassword.confirmError}</AuthAlert>}
      {isSuccess && <AuthAlert status="success">{es.auth.resetPassword.confirmSuccess}</AuthAlert>}
      {children}
    </VStack>
  );
};
