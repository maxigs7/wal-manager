'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { ComponentProps, useMemo } from 'react';

import { Button, VStack } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { FormProvider, useForm, yupResolver } from 'react-hook-form';

import { routes } from '@/routes';

import { AuthAlert, AuthLink } from '../../components';
import { SignInFormType, signInFormSchema } from '../../models';
import { useSignIn } from '../../query';

type Props = ComponentProps<'form'>;

export const SignInFormContainer: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation('auth-sign-in');
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
      <VStack as="form" gap="2" mx="auto" my="5" onSubmit={handleSubmit(signInHandler)} w="full">
        {isError && <AuthAlert status="error">{t('error')}</AuthAlert>}
        {children}
        <AuthLink href={routes.auth.resetPassword}>{t('resetPasswordLink')}</AuthLink>

        <Button
          colorScheme="accent"
          isLoading={form.formState.isSubmitting}
          maxW="sm"
          type="submit"
          w="full"
        >
          {t('action')}
        </Button>
      </VStack>
    </FormProvider>
  );
};
