import { Box } from '@chakra-ui/react';

import { es } from '@/i18n';
import { ActionBar, Title } from '@/layout/settings';
import { createServerClient } from '@/lib/supabase/create-server-client';
import { AccountUseFormProvider } from '@/m/accounts/account-form/use-form-provider';
import { AccountUpdateFormSSR } from '@/m/accounts/account-update';
import { UpdateAccountButton } from '@/m/accounts/account-update/button';
import { BackButtonLink } from '@/m/shared/buttons';
import { routes } from '@/routes';

export const revalidate = 1;
export const fetchCache = 'force-no-store';
export const metadata = {
  title: es.account.pages.update.title,
};

type AccountCheckingProps = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: AccountCheckingProps) => {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <AccountUseFormProvider accountId={params.id} userId={session?.user.id || ''}>
      <Title>{es.account.pages.update.title}</Title>
      <Box as="form" noValidate>
        <ActionBar>
          <BackButtonLink href={routes.settings.account.index}>{es.common.goBack}</BackButtonLink>
          <UpdateAccountButton />
        </ActionBar>
        <Box p="3">
          <AccountUpdateFormSSR id={params.id} />
        </Box>
      </Box>
    </AccountUseFormProvider>
  );
};

export default Page;
