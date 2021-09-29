import { Redirect } from 'react-router';

import { Button, Icon } from '@chakra-ui/react';

import { ReactComponent as GoogleLogo } from '@app/assets/images/google.svg';
import { useAppDispatch, useAppSelector } from '@app/hooks/redux';
import { useRouter } from '@app/hooks/useRouter';
import { LOGIN_REQUEST } from '@app/stores/auth';

export const LoginContainer: React.FC = () => {
  const { location } = useRouter();
  const redirectTo = useAppSelector((state) => state.auth.redirectTo);
  const dispatch = useAppDispatch();

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  const signInHandler = async () => {
    try {
      await dispatch(LOGIN_REQUEST(location.state?.from || '/dashboard'));
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
