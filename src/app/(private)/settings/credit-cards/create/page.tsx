import 'server-only';

import { Box, Flex, ScaleFade } from '@chakra-ui/react';

import { es } from '@/i18n';
import { Title } from '@/layout/settings';
import { createServerClient } from '@/lib/supabase/create-server-client';
import { CreateCreditCardButton } from '@/m/credit-cards/credit-card-create/button';
import { CreditCardForm } from '@/m/credit-cards/credit-card-form';
import { CreditCardUseFormProvider } from '@/m/credit-cards/credit-card-form/use-form-provider';
import { BackButtonLink } from '@/m/shared/buttons';
import { routes } from '@/routes';

export const revalidate = 0;
export const metadata = {
  title: es.creditCard.pages.create.title,
};

const Page = async () => {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <CreditCardUseFormProvider userId={session?.user.id || ''}>
      <Box as="form" noValidate>
        <ScaleFade in={true}>
          <Flex align="center" flexWrap="wrap" mb="2">
            <Title flexBasis={{ base: '100%', md: 'auto' }}>
              {es.creditCard.pages.create.title}
            </Title>
            <Flex flexBasis={{ base: '100%', md: 'auto' }} gap="2" ml={{ base: '0', md: 'auto' }}>
              <BackButtonLink
                flexBasis={{ base: '50%', md: 'auto' }}
                href={routes.settings.creditCard.index}
              >
                {es.common.goBack}
              </BackButtonLink>
              <CreateCreditCardButton flexBasis={{ base: '50%', md: 'auto' }} />
            </Flex>
          </Flex>
        </ScaleFade>
        <ScaleFade in={true}>
          <CreditCardForm />
        </ScaleFade>
      </Box>
    </CreditCardUseFormProvider>
  );
};

export default Page;
