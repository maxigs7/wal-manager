'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

import { Button, VStack } from '@chakra-ui/react';
import { FormProvider, useForm, yupResolver } from 'react-hook-form';

import { es } from '@/i18n';
import { routes } from '@/routes';

import { AuthAlert } from '../../components';
import { resetPasswordConfirmFormSchema, ResetPasswordConfirmFormType } from '../../models';
import { useUpdatePassword } from '../../query';

const ResetPasswordConfirmContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const form = useForm<ResetPasswordConfirmFormType>({
    resolver: yupResolver(resetPasswordConfirmFormSchema),
  });
  const { handleSubmit } = form;
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
    <FormProvider {...form}>
      <VStack
        as="form"
        gap="2"
        mx="auto"
        my="5"
        onSubmit={handleSubmit(resetPasswordHandler)}
        w="full"
      >
        {isError && <AuthAlert status="error">{es.auth.resetPassword.confirmError}</AuthAlert>}
        {isSuccess && (
          <AuthAlert status="success">{es.auth.resetPassword.confirmSuccess}</AuthAlert>
        )}
        {children}
        <Button
          colorScheme="accent"
          isLoading={form.formState.isSubmitting}
          maxW="sm"
          type="submit"
          w="full"
        >
          {es.auth.resetPassword.confirmAction}
        </Button>
      </VStack>
    </FormProvider>
  );
};

export { ResetPasswordConfirmContainer };
