import { useSearchParams, useRouter } from 'next/navigation';
import { ComponentProps, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';
import { UseFormHandleSubmit } from 'react-hook-form';

import { es } from '@/i18n';
import { routes } from '@/routes';

import { AuthAlert } from '../../components';
import { useSignUp } from '../../hooks';
import { SignUpFormType } from '../../models';

type Props = ComponentProps<'form'> & {
  handleSubmit: UseFormHandleSubmit<SignUpFormType>;
};

export const FormContainer: React.FC<Props> = ({ children, handleSubmit }) => {
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

  useEffect(() => {
    // Prefetch the dashboard page
    const from = searchParams?.get('from') || routes.dashboard;
    router.prefetch(from);
  }, [router, searchParams]);

  return (
    <VStack as="form" gap="2" mx="auto" my="5" onSubmit={handleSubmit(signUpHandler)} w="full">
      {isError && <AuthAlert status="error">{es.auth.signUp.error}</AuthAlert>}
      {children}
    </VStack>
  );
};
