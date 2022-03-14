import { useForm } from 'react-hook-form';

import { VStack, Button } from '@chakra-ui/react';

import { useRouter } from '@lib';

import { AuthError, SignInForm, SignInFormType } from '../../components';
import { useSignIn } from '../../hooks';

const Container: React.FC = () => {
  const { location, navigate } = useRouter();
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
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack as="form" maxW="xs" onSubmit={form.handleSubmit(signInHandler)} w="full">
      {isError && <AuthError>Usuario o contraseña incorrecta</AuthError>}
      <SignInForm {...form} />
      <Button
        colorScheme="accent"
        isLoading={isLoading}
        mt={{ base: 12, sm: 6 }}
        mx={2}
        type="submit"
        w="full"
      >
        Sign In
      </Button>
    </VStack>
  );
};

export default Container;
