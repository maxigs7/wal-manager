import { Box, Flex, ScaleFade } from '@chakra-ui/react';

import { es } from '@/i18n';
import { Title } from '@/layout/settings';
import { createServerClient } from '@/lib/supabase/create-server-client';
import { AccountUseFormProvider } from '@/m/accounts/account-form/use-form-provider';
import { AccountUpdateFormSSR } from '@/m/accounts/account-update';
import { UpdateAccountButton } from '@/m/accounts/account-update/button';
import { BackButtonLink } from '@/m/shared/buttons';
import { routes } from '@/routes';

export const revalidate = 0;
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
      <Box as="form" noValidate>
        <ScaleFade in={true}>
          <Flex align="center" flexWrap="wrap" mb="2">
            <Title flexBasis={{ base: '100%', md: 'auto' }}>{es.account.pages.update.title}</Title>
            <Flex flexBasis={{ base: '100%', md: 'auto' }} gap="2" ml={{ base: '0', md: 'auto' }}>
              <BackButtonLink
                flexBasis={{ base: '50%', md: 'auto' }}
                href={routes.settings.account.index}
              >
                {es.common.goBack}
              </BackButtonLink>
              <UpdateAccountButton flexBasis={{ base: '50%', md: 'auto' }} />
            </Flex>
          </Flex>
        </ScaleFade>
        <ScaleFade in={true}>
          <AccountUpdateFormSSR id={params.id} />
        </ScaleFade>
      </Box>
    </AccountUseFormProvider>
  );
};

export default Page;
