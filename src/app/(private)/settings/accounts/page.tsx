import { es } from '@/i18n';
import { Title } from '@/layout/settings';

export const revalidate = 0;
export const metadata = {
  title: es.account.pages.index.metaTitle,
};

const Page = () => {
  return <Title>{es.account.pages.index.title}</Title>;
};

export default Page;
