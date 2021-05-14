import { useMutation } from 'react-query';

import { ReactComponent as GoogleLogo } from '@app/assets/images/google.svg';
import { Button, CardContainer } from '@app/components/ui';
import { useAuth } from '@lib/auth';

const LoginPage: React.FC = () => {
  const { signInWithGoogle } = useAuth();

  const { mutate: signIn } = useMutation(() => signInWithGoogle(), {
    onError: (_error) => {
      console.error(_error);
    },
    onSuccess: (_data, id) => {
      console.log(_data, id);
    },
    onSettled: () => {
      console.log('Should Redirect');
    },
  });

  const signInHandler = () => {
    signIn();
  };

  return (
    <CardContainer className="flex flex-row w-auto">
      <div className="p-10 flex flex-col">
        <h1 className="text-xl font-normal leading-normal mb-2 text-lightBlue-800">
          Sign in to use Fin Manager
        </h1>

        <Button className="mt-2" color="amber" onClick={signInHandler}>
          <GoogleLogo className="w-5 mr-1" height={30} width={30} />
          Sign in with Google
        </Button>
      </div>
      <img
        alt="login image"
        className="max-w-sm backdrop-filter backdrop-opacity-80 "
        src="/images/auth-bg-final.jpg"
      />
    </CardContainer>
  );
};

export default LoginPage;
