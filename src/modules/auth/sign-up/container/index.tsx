'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { PropsWithChildren, useMemo } from 'react';

import { Button, VStack } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { FormProvider, useForm, yupResolver } from 'react-hook-form';

import { routes } from '@/routes';

import { AuthAlert } from '../../components';
import { signUpFormSchema, SignUpFormType } from '../../models';
import { useSignUp } from '../../query';

const SignUpFormContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation('auth-sign-up');
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
      <VStack as="form" gap="2" mx="auto" my="5" onSubmit={handleSubmit(signUpHandler)} w="full">
        {isError && <AuthAlert status="error">{t('error')}</AuthAlert>}
        {children}

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

export { SignUpFormContainer };
