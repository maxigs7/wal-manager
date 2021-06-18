import { ReactComponent as WalletLogo } from '@app/assets/images/wallet.svg';
import { LoginContainer } from '@app/modules/auth';
import { Title } from '@app/modules/common';

const styles = {
  container:
    'w-full sm:w-4/6 md:w-3/6 lg:w-4/12 xl:w-3/12 text-white py-12 px-2 sm:px-0 flex flex-col text-center',
  logo: 'w-24 h-24 text-white',
  title: 'mt-16 mx-2 text-2xl sm:text-3xl xl:text-2xl font-bold leading-tight',
  top: 'flex flex-col items-center justify-center',
};

const LoginPage: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.top}>
      <WalletLogo className={styles.logo} height={44} width={44} />
      <Title className="mt-8" tag="h2">
        Wal Manager
      </Title>
    </div>

    <Title className={styles.title} tag="h3">
      Login To Your Account
    </Title>

    <LoginContainer />
  </div>
);

export default LoginPage;
