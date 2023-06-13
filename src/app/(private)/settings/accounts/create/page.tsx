import 'server-only';

import { Box } from '@chakra-ui/react';

import { es } from '@/i18n';
import { ActionBar, Title } from '@/layout/settings';
import { createServerClient } from '@/lib/supabase/create-server-client';
import { AccountCreateFormSSR } from '@/m/accounts/account-create';
import { CreateAccountButton } from '@/m/accounts/account-create/button';
import { AccountUseFormProvider } from '@/m/accounts/account-form/use-form-provider';
import { BackButtonLink } from '@/m/shared/buttons';
import { routes } from '@/routes';

export const revalidate = 0;
export const metadata = {
  title: es.account.pages.create.title,
};

const Page = async () => {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <AccountUseFormProvider userId={session?.user.id || ''}>
      <Title>{es.account.pages.create.title}</Title>
      <Box as="form" noValidate>
        <ActionBar>
          <BackButtonLink href={routes.settings.account.index}>{es.common.goBack}</BackButtonLink>
          <CreateAccountButton />
        </ActionBar>
        <Box p="3">
          <AccountCreateFormSSR />
        </Box>
      </Box>
    </AccountUseFormProvider>
  );
};

export default Page;
