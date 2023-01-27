import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { VStack, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { es } from '@i18n';

import { AuthMessage, SignInForm, SignInFormType } from '../../components';
import { useSignIn } from '../../hooks';

// interface IState {
//   from?: { pathname: string };
// }

const Container: React.FC = () => {
  const router = useRouter();
  const { isError, isLoading, mutateAsync } = useSignIn();
  const form = useForm<SignInFormType>();

  const signInHandler = async (user: SignInFormType) => {
    try {
      await mutateAsync({ ...user });
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      // const from = state?.from?.pathname || '/dashboard';

      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/dashboard');
  }, [router]);

  return (
    <VStack as="form" maxW="xs" onSubmit={form.handleSubmit(signInHandler)} w="full">
      {isError && <AuthMessage>{es.auth.signIn.error}</AuthMessage>}
      <SignInForm {...form} />
      <Button
        colorScheme="accent"
        isLoading={isLoading}
        mt={{ base: 12, sm: 6 }}
        mx={2}
        type="submit"
        w="full"
      >
        {es.auth.signIn.action}
      </Button>
    </VStack>
  );
};

export default Container;
