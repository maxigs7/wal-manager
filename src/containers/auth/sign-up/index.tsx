import { useForm } from 'react-hook-form';

import { VStack, Button, Flex } from '@chakra-ui/react';

import { useAuthApi } from '@api';
import { SignUpForm, SignUpFormType } from '@components';
import { useRouter } from '@hooks';

export const SignUpContainer: React.FC = () => {
  const { location } = useRouter();
  const { signUp } = useAuthApi();
  const form = useForm<SignUpFormType>();

  const signUpHandler = async (user: SignUpFormType) => {
    try {
      await signUp.mutate({ ...user, redirectTo: location.state?.from || '/dashboard' });
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
