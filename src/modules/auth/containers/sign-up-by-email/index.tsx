import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { VStack, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { es } from '@/i18n';

import { AuthMessage, SignUpForm, SignUpFormType } from '../../components';
import { useSignUp } from '../../hooks';


interface IState {
  from?: { pathname: string };
}

const Container: React.FC = () => {
  const router = useRouter();
  const { isError, isLoading, mutateAsync } = useSignUp();
  const form = useForm<SignUpFormType>();

  const signUpHandler = async (user: SignUpFormType) => {
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
    <VStack as="form" maxW="xs" onSubmit={form.handleSubmit(signUpHandler)} w="full">
      {isError && <AuthMessage>{es.auth.signUp.error(form.getValues('email'))}</AuthMessage>}
      <SignUpForm {...form} />
      <Button
        colorScheme="accent"
        isLoading={isLoading}
        mt={{ base: 12, sm: 6 }}
        mx={2}
        type="submit"
        w="full"
      >
        {es.auth.signUp.action}
      </Button>
    </VStack>
  );
};

export default Container;
