import { Button, Icon } from '@chakra-ui/react';

import { ReactComponent as GoogleLogo } from '@app/assets/images/google.svg';
import { useRouter } from '@app/hooks/useRouter';
import { useAuth } from '@lib/auth';

export const LoginContainer: React.FC = () => {
  const { push } = useRouter();
  const { signInWithGoogle } = useAuth();

  const signInHandler = async () => {
    try {
      await signInWithGoogle();
      push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      bg="white"
      color="gray.900"
      leftIcon={<Icon as={GoogleLogo} h={30} w={30} />}
      mt={{ base: 12, sm: 6 }}
      mx={2}
      onClick={signInHandler}
    >
      Sign in with Google
    </Button>
  );
};
