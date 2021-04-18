import { ReactComponent as GoogleLogo } from 'assets/img/google.svg';
import Button from 'components/ui/buttons';

const Login: React.FC = () => (
  <>
    <Button color="white">
      <GoogleLogo className="w-5 mr-1" /> Sign in with Google
    </Button>
  </>
);

export default Login;
