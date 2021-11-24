import { useForm } from 'react-hook-form';

import { VStack, Button, Flex } from '@chakra-ui/react';

import { useAuthApi } from '@api';
import { SignUpForm, SignUpFormType } from '@components';
import { useRouter } from '@hooks';

export const SignUpContainer: React.FC = () => {
  const { location, navigate } = useRouter();
  const { signUp } = useAuthApi();
  const form = useForm<SignUpFormType>();

  const signUpHandler = async (user: SignUpFormType) => {
    try {
      await signUp.mutateAsync({ ...user });
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
    <Flex direction="column" maxW="xs" w="full">
      <VStack as="form" onSubmit={form.handleSubmit(signUpHandler)}>
        <SignUpForm {...form} />
        <Button
          colorScheme="crimson"
          isLoading={signUp.isLoading}
          mt={{ base: 12, sm: 6 }}
          mx={2}
          type="submit"
          w="full"
        >
          Sign Up
        </Button>
      </VStack>
    </Flex>
  );
};
