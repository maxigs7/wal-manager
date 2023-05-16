'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

import { Button, VStack } from '@chakra-ui/react';
import { FormProvider, useForm, yupResolver } from 'react-hook-form';

import { es } from '@/i18n';

import { AuthAlert } from '../../components';
import { ResetPasswordRequestFormType, resetPasswordRequestFormTypeSchema } from '../../models';
import { useResetPasswordRequest } from '../../query';

const ResetPasswordRequestContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const form = useForm<ResetPasswordRequestFormType>({
    resolver: yupResolver(resetPasswordRequestFormTypeSchema),
  });
  const { handleSubmit } = form;
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
    <FormProvider {...form}>
      <VStack
        as="form"
        gap="2"
        mx="auto"
        my="5"
        onSubmit={handleSubmit(resetPasswordHandler)}
        w="full"
      >
        {isError && <AuthAlert status="error">{es.auth.resetPassword.requestError}</AuthAlert>}
        {isSuccess && (
          <AuthAlert status="success">{es.auth.resetPassword.requestSuccess}</AuthAlert>
        )}
        {children}
        <Button
          colorScheme="accent"
          isLoading={form.formState.isSubmitting}
          maxW="sm"
          type="submit"
          w="full"
        >
          {es.auth.resetPassword.requestAction}
        </Button>
      </VStack>
    </FormProvider>
  );
};

export { ResetPasswordRequestContainer };
