import 'server-only';

import { es } from '@/i18n';
import { PageContainer, PageTitle } from '@/layout/full';
import { AccountListSSR } from '@/m/accounts/account-list/list-ssr';

export const revalidate = 0;
export const metadata = {
  title: es.account.pages.index.metaTitle,
};

const Page = async () => {
  return (
    <PageContainer>
      <PageTitle>{es.investment.pages.create.title}</PageTitle>
      <AccountListSSR />
    </PageContainer>
  );
};

export default Page;
