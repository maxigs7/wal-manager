import { useForm } from 'react-hook-form';

import { VStack, Button, Flex, Icon } from '@chakra-ui/react';

import { useAuthApi } from '@api';
import { ReactComponent as GoogleLogo } from '@assets/images/google.svg';
import { SignInForm, SignInFormType } from '@components';
import { AUTH_GOOGLE_ENABLED } from '@constants';
import { useRouter } from '@hooks';

export const SignInContainer: React.FC = () => {
  const { location, navigate } = useRouter();
  const { signIn, signInGoogle } = useAuthApi();
  const form = useForm<SignInFormType>();

  const signInHandler = async (user: SignInFormType) => {
    try {
      await signIn.mutateAsync({ ...user });
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

  const signInGoogleHandler = async () => {
    try {
      await signInGoogle.mutateAsync(`${window.origin}/${location.state?.from || 'dashboard'}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex direction="column" maxW="xs" w="full">
      <VStack as="form" onSubmit={form.handleSubmit(signInHandler)}>
        <SignInForm {...form} />
        <Button
          colorScheme="crimson"
          isLoading={signIn.isLoading}
          mt={{ base: 12, sm: 6 }}
          mx={2}
          type="submit"
          w="full"
        >
          Sign In
        </Button>
      </VStack>
      {AUTH_GOOGLE_ENABLED && (
        <Button
          bg="white"
          color="gray.900"
          leftIcon={<Icon as={GoogleLogo} h={30} w={30} />}
          mt={{ base: 12, sm: 6 }}
          onClick={signInGoogleHandler}
          w="full"
        >
          Sign in with Google
        </Button>
      )}
    </Flex>
  );
};
