'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useMemo } from 'react';

import { Button, VStack } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { FormProvider, useForm, yupResolver } from 'react-hook-form';

import { AuthAlert } from '../../components';
import { ResetPasswordRequestFormType, resetPasswordRequestFormTypeSchema } from '../../models';
import { useResetPasswordRequest } from '../../query';

const ResetPasswordRequestContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation('auth-reset-password');
  const resolver = useMemo(() => yupResolver(resetPasswordRequestFormTypeSchema(t)), [t]);
  const form = useForm<ResetPasswordRequestFormType>({
    resolver,
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
        {isError && <AuthAlert status="error">{t('requestError')}</AuthAlert>}
        {isSuccess && <AuthAlert status="success">{t('requestSuccess')}</AuthAlert>}
        {children}
        <Button
          colorScheme="accent"
          isLoading={form.formState.isSubmitting}
          maxW="sm"
          type="submit"
          w="full"
        >
          {t('requestAction')}
        </Button>
      </VStack>
    </FormProvider>
  );
};

export { ResetPasswordRequestContainer };
