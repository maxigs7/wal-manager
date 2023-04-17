import { useRouter } from 'next/navigation';
import { ComponentProps, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';
import { UseFormHandleSubmit } from 'react-hook-form';

import { es } from '@/i18n';

import { AuthAlert } from '../../components';
import { useResetPasswordRequest } from '../../hooks';
import { ResetPasswordRequestFormType } from '../../models';

type Props = Omit<ComponentProps<'form'>, 'onSubmit'> & {
  handleSubmit: UseFormHandleSubmit<ResetPasswordRequestFormType>;
};

export const FormContainer: React.FC<Props> = ({ children, handleSubmit }) => {
  const router = useRouter();
  const { isError, isSuccess, mutateAsync } = useResetPasswordRequest();

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
    <VStack
      as="form"
      gap="2"
      mx="auto"
      my="5"
      onSubmit={handleSubmit(resetPasswordHandler)}
      w="full"
    >
      {isError && <AuthAlert status="error">{es.auth.resetPassword.requestError}</AuthAlert>}
      {isSuccess && <AuthAlert status="success">{es.auth.resetPassword.requestSuccess}</AuthAlert>}
      {children}
    </VStack>
  );
};
