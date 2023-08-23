'use client';

import { useRouter } from 'next/navigation';
import { ComponentProps, useEffect, useMemo } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { FormProvider, useForm, yupResolver } from 'react-hook-form';

import { useScopedI18n } from '@/i18n/client';
import { routes } from '@/routes';

import { ResetPasswordRequestFormType, resetPasswordRequestFormTypeSchema } from '../../models';
import { useResetPasswordRequest } from '../../query';

type Props = ComponentProps<'form'> & {
  translations: Record<'requestError' | 'requestSuccess', string>;
};

const ResetPasswordRequestFormManager: React.FC<Props> = ({ children, translations }) => {
  const t = useScopedI18n('common');
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
      <Box
        className="flex flex-col gap-3 mx-auto my-3 w-full items-center"
        component="form"
        onSubmit={handleSubmit(resetPasswordHandler)}
      >
        {isError && <Alert severity="error">{translations.requestError}</Alert>}
        {isSuccess && <Alert severity="success">{translations.requestSuccess}</Alert>}

        {children}
      </Box>
    </FormProvider>
  );
};

export default ResetPasswordRequestFormManager;
