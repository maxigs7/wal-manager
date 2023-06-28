import 'server-only';

import { Flex } from '@chakra-ui/react';

import { es } from '@/i18n';
import { Title } from '@/layout/settings';
import { AccountTableSSR } from '@/m/accounts/account-table/table-ssr';
import { CreateButtonLink } from '@/m/shared/buttons';
import { ModalManagerProvider } from '@/modules/shared/modal-manager/provider';
import { routes } from '@/routes';

export const revalidate = 0;
export const metadata = {
  title: es.account.pages.index.metaTitle,
};

const Page = async () => {
  return (
    <ModalManagerProvider>
      <Flex>
        <Title>{es.account.pages.index.title}</Title>
        <CreateButtonLink
          href={routes.settings.account.create}
          ml="auto"
          size="sm"
          textTransform="uppercase"
        >
          {es.common.create}
        </CreateButtonLink>
      </Flex>
      <AccountTableSSR />
    </ModalManagerProvider>
  );
};

export default Page;
