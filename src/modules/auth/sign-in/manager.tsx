'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { ComponentProps, useMemo } from 'react';
import React from 'react';

import { FormProvider, useForm, yupResolver } from 'react-hook-form';

import { useScopedI18n } from '@/i18n/client';
import { Button } from '@/lib/@nextui-org/button';
import { Alert } from '@/m/shared/alert';
import { routes } from '@/routes';

import { AuthLink } from '../components/link';
import { SignInFormType, signInFormSchema } from '../models';
import { useSignIn } from '../query';

type Props = ComponentProps<'form'> & {
  translations: Record<'error' | 'action' | 'resetPasswordLink', string>;
};

export const SignInFormManager: React.FC<Props> = ({ children, translations }) => {
  const t = useScopedI18n('common');
  const resolver = useMemo(() => yupResolver(signInFormSchema(t)), [t]);
  const form = useForm<SignInFormType>({
    resolver,
  });
  const { handleSubmit } = form;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isError, mutateAsync } = useSignIn();

  const signInHandler = async (user: SignInFormType) => {
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
      <form
        className="flex flex-col gap-3 mx-auto my-5 w-full items-center"
        onSubmit={handleSubmit(signInHandler)}
      >
        {isError && <Alert status="error">{translations.error}</Alert>}

        {children}

        <AuthLink href={routes.auth.resetPassword}>{translations.resetPasswordLink}</AuthLink>

        <Button
          className="uppercase max-w-xs font-bold"
          color="accent"
          isLoading={form.formState.isSubmitting}
          type="submit"
          fullWidth
        >
          {translations.action}
        </Button>
      </form>
    </FormProvider>
  );
};
