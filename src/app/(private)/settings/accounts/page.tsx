import { Box } from '@chakra-ui/react';

import { es } from '@/i18n';
import { Title } from '@/layout/settings';
import { AccountTableContainer } from '@/modules/accounts/containers/table';
import { routes } from '@/routes';
import { CreateButtonLink } from '@/shared/components';

export const revalidate = 0;
export const metadata = {
  title: es.account.pages.index.metaTitle,
};

const Page = () => {
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
        <AccountTableContainer />
      </Box>
    </>
  );
};

export default Page;
