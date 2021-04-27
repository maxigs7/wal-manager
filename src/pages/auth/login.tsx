import { ReactComponent as GoogleLogo } from 'assets/img/google.svg';
import bgImage from 'assets/img/auth-bg-final.jpg';
import Button from 'components/ui/buttons';
import CardContainer from 'components/ui/card-container';
import { useApi } from 'providers';
import { useMutation } from 'react-query';

const Login: React.FC = () => {
  const api = useApi();

  const { mutate: signIn } = useMutation(() => api.signInWithGoogle(), {
    onError: (_error) => {
      console.log(_error);
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

        <Button color="amber" className="mt-2" onClick={signInHandler}>
          <GoogleLogo className="w-5 mr-1" /> Sign in with Google
        </Button>
      </div>
      <img
        src={bgImage}
        alt="login image"
        className="max-w-sm backdrop-filter backdrop-opacity-80 "
      />
    </CardContainer>
  );
};

export default Login;
