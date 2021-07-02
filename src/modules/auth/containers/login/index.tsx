import { ReactComponent as GoogleLogo } from '@app/assets/images/google.svg';
import { useRouter } from '@app/hooks/useRouter';
import { FillButton } from '@app/modules/common';
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
    <FillButton className="mt-12 mx-2 sm:mx-6" color="white" onClick={signInHandler}>
      <GoogleLogo className="w-5 mr-1" height={30} width={30} />
      Sign in with Google
    </FillButton>
  );
};
