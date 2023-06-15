import 'server-only';

import { Box, Flex, ScaleFade } from '@chakra-ui/react';

import { es } from '@/i18n';
import { Title } from '@/layout/settings';
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
      <Box as="form" noValidate>
        <ScaleFade in={true}>
          <Flex align="center" flexWrap="wrap" mb="2">
            <Title flexBasis={{ base: '100%', md: 'auto' }}>{es.account.pages.create.title}</Title>
            <Flex flexBasis={{ base: '100%', md: 'auto' }} gap="2" ml={{ base: '0', md: 'auto' }}>
              <BackButtonLink
                flexBasis={{ base: '50%', md: 'auto' }}
                href={routes.settings.account.index}
              >
                {es.common.goBack}
              </BackButtonLink>
              <CreateAccountButton flexBasis={{ base: '50%', md: 'auto' }} />
            </Flex>
          </Flex>
        </ScaleFade>
        <ScaleFade in={true}>
          <AccountCreateFormSSR />
        </ScaleFade>
      </Box>
    </AccountUseFormProvider>
  );
};

export default Page;
