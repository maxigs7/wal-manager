import 'server-only';

import { Flex } from '@chakra-ui/react';

import { es } from '@/i18n';
import { Title } from '@/layout/settings';
import { CreditCardTableSSR } from '@/m/credit-cards/credit-card-table/table-ssr';
import { CreateButtonLink } from '@/m/shared/buttons';
import { ModalManagerProvider } from '@/m/shared/modal-manager/provider';
import { routes } from '@/routes';

export const revalidate = 0;
export const metadata = {
  title: es.creditCard.pages.index.metaTitle,
};

const Page = async () => {
  return (
    <ModalManagerProvider>
      <Flex>
        <Title>{es.creditCard.pages.index.title}</Title>
        <CreateButtonLink
          href={routes.settings.creditCard.create}
          ml="auto"
          size="sm"
          textTransform="uppercase"
        >
          {es.common.create}
        </CreateButtonLink>
      </Flex>
      <CreditCardTableSSR />
    </ModalManagerProvider>
  );
};

export default Page;
