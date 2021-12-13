import { useForm } from 'react-hook-form';

import { VStack, Button } from '@chakra-ui/react';

import { useSignUp } from '@entities';
import { useRouter } from '@shared';

import { Form, SignUpFormType } from './form';

const Container: React.FC = () => {
  const { location, navigate } = useRouter();
  const { isLoading, mutateAsync } = useSignUp();
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
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack as="form" maxW="xs" onSubmit={form.handleSubmit(signUpHandler)} w="full">
      <Form {...form} />
      <Button
        colorScheme="crimson"
        isLoading={isLoading}
        mt={{ base: 12, sm: 6 }}
        mx={2}
        type="submit"
        w="full"
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Container;
