'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { ComponentProps, useMemo } from 'react';
import React from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { FormProvider, useForm, yupResolver } from 'react-hook-form';

import { useScopedI18n } from '@/i18n/client';
import { routes } from '@/routes';

import { SignUpFormType, signUpFormSchema } from '../models';
import { useSignUp } from '../query';

type Props = ComponentProps<'form'> & {
  translations: Record<'error', string>;
};

const SignUpFormManager: React.FC<Props> = ({ children, translations }) => {
  const t = useScopedI18n('common');
  const resolver = useMemo(() => yupResolver(signUpFormSchema(t)), [t]);
  const form = useForm<SignUpFormType>({
    resolver,
  });
  const { handleSubmit } = form;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isError, mutateAsync } = useSignUp();

  const signUpHandler = async (user: SignUpFormType) => {
    try {
      await mutateAsync({ ...user });
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      const from = searchParams?.get('from') || routes.dashboard;
      router.replace(from);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   // Prefetch the dashboard page
  //   const from = searchParams?.get('from') || routes.dashboard;
  //   router.prefetch(from);
  // }, [router, searchParams]);

  return (
    <FormProvider {...form}>
      <Box
        className="flex flex-col gap-3 mx-auto my-3 w-full items-center"
        component="form"
        onSubmit={handleSubmit(signUpHandler)}
      >
        {isError && <Alert severity="error">{translations.error}</Alert>}

        {children}
      </Box>
    </FormProvider>
  );
};

export default SignUpFormManager;
