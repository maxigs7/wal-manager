import { LogoIcon } from '@/m/shared/icons';

const styles = {
  logo: 'w-24 h-24 text-white fill-primary-400',
  title: 'flex items-center justify-center py-6 uppercase',
};
const AppName: React.FC = () => (
  <h1 className={styles.title}>
    <LogoIcon className={styles.logo} />
  </h1>
);

export { AppName };
