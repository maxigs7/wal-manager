import { useMutation } from 'react-query';

import { ReactComponent as GoogleLogo } from '@app/assets/images/google.svg';
import { Button } from '@app/components/ui';
import { useRouter } from '@app/hooks/useRouter';
import { useAuth } from '@lib/auth';

export const LoginContainer: React.FC = () => {
  const { push } = useRouter();
  const { signInWithGoogle } = useAuth();

  const { mutate: signIn } = useMutation(() => signInWithGoogle(), {
    onError: (_error) => {
      // TODO: SHOW TOAST
      console.error(_error);
    },
    onSuccess: () => {
      push('/');
    },
  });

  const signInHandler = () => {
    signIn();
  };

  return (
    <Button className="mt-12 mx-2 sm:mx-6" color="WHITE" onClick={signInHandler}>
      <GoogleLogo className="w-5 mr-1" height={30} width={30} />
      Sign in with Google
    </Button>
  );
};
