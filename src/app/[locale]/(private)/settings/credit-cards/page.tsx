import 'server-only';

import { Flex } from '@chakra-ui/react';

import { es } from '@/i18n';
import { Title } from '@/layout/settings';
import { createServerClient } from '@/lib/supabase/create-server-client';
import { CreditCardTableSSR } from '@/m/credit-cards/credit-card-table/table-ssr';
import { ModalManagerProvider } from '@/m/shared/modal-manager/provider';

import { CreateCreditCardButton } from './create-button';
import { ModalsRegister } from './modals-register';

export const revalidate = 0;
export const metadata = {
  title: es.creditCard.pages.index.metaTitle,
};

const Page = async () => {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <ModalManagerProvider>
      <ModalsRegister />
      <Flex>
        <Title>{es.creditCard.pages.index.title}</Title>
        <CreateCreditCardButton ml="auto" userId={session?.user?.id as string} />
      </Flex>
      <CreditCardTableSSR />
    </ModalManagerProvider>
  );
};

export default Page;
