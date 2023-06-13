import 'server-only';

import { Box } from '@chakra-ui/react';

import { es } from '@/i18n';
import { Title } from '@/layout/settings';
import { AccountTableSSR } from '@/m/accounts/account-table/table-ssr';
import { CreateButtonLink } from '@/m/shared/buttons';
import { routes } from '@/routes';

export const revalidate = 0;
export const metadata = {
  title: es.account.pages.index.metaTitle,
};

const Page = async () => {
  return (
    <>
      <Title>{es.account.pages.index.title}</Title>
      <Box>
        <Box p="3">
          <CreateButtonLink
            href={routes.settings.account.create}
            size="sm"
            textTransform="uppercase"
          >
            {es.common.create}
          </CreateButtonLink>
        </Box>
        <AccountTableSSR />
      </Box>
    </>
  );
};

export default Page;
