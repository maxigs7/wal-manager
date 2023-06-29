import 'server-only';

import { Flex } from '@chakra-ui/react';

import { es } from '@/i18n';
import { Title } from '@/layout/settings';
import { createServerClient } from '@/lib/supabase/create-server-client';
import { AccountTableSSR } from '@/m/accounts/account-table/table-ssr';
import { ModalManagerProvider } from '@/m/shared/modal-manager/provider';

import { CreateAccountButton } from './create-button';
import { ModalsRegister } from './modals-register';

export const revalidate = 0;
export const metadata = {
  title: es.account.pages.index.metaTitle,
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
        <Title>{es.account.pages.index.title}</Title>

        <CreateAccountButton ml="auto" userId={session?.user?.id as string} />
      </Flex>
      <AccountTableSSR />
    </ModalManagerProvider>
  );
};

export default Page;
