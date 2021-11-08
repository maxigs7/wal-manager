// import { Redirect } from 'react-router';

import { useForm } from 'react-hook-form';

import { VStack, Button, Flex, Icon } from '@chakra-ui/react';

import { useAuthApi } from '@api';
import { ReactComponent as GoogleLogo } from '@assets/images/google.svg';
import { SignInForm, SignInFormType } from '@components';
import { useRouter } from '@hooks';

export const SignInContainer: React.FC = () => {
  const { location, match } = useRouter();
  const { signIn, signInGoogle } = useAuthApi();
  const form = useForm<SignInFormType>();

  const signInHandler = async (user: SignInFormType) => {
    try {
      await signIn.mutate({ ...user, redirectTo: location.state?.from || '/dashboard' });
    } catch (error) {
      console.error(error);
    }
  };
  console.log(window.origin, location, match);

  const signInGoogleHandler = async () => {
    try {
      console.log(location);
      await signInGoogle.mutate(`${window.origin}/${location.state?.from || 'dashboard'}`);
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
    </Flex>
  );
};
