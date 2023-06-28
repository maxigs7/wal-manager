import { Box, Flex, ScaleFade } from '@chakra-ui/react';

import { es } from '@/i18n';
import { Title } from '@/layout/settings';
import { createServerClient } from '@/lib/supabase/create-server-client';
import { CreditCardUseFormProvider } from '@/m/credit-cards/credit-card-form/use-form-provider';
import { CreditCardUpdateFormSSR } from '@/m/credit-cards/credit-card-update';
import { UpdateCreditCardButton } from '@/m/credit-cards/credit-card-update/button';
import { BackButtonLink } from '@/m/shared/buttons';
import { routes } from '@/routes';

export const revalidate = 0;
export const metadata = {
  title: es.creditCard.pages.update.title,
};

type CreditCardCheckingProps = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: CreditCardCheckingProps) => {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <CreditCardUseFormProvider creditCardId={params.id} userId={session?.user.id || ''}>
      <Box as="form" noValidate>
        <ScaleFade in={true}>
          <Flex align="center" flexWrap="wrap" mb="2">
            <Title flexBasis={{ base: '100%', md: 'auto' }}>
              {es.creditCard.pages.update.title}
            </Title>
            <Flex flexBasis={{ base: '100%', md: 'auto' }} gap="2" ml={{ base: '0', md: 'auto' }}>
              <BackButtonLink
                flexBasis={{ base: '50%', md: 'auto' }}
                href={routes.settings.creditCard.index}
              >
                {es.common.goBack}
              </BackButtonLink>
              <UpdateCreditCardButton flexBasis={{ base: '50%', md: 'auto' }} />
            </Flex>
          </Flex>
        </ScaleFade>
        <ScaleFade in={true}>
          <CreditCardUpdateFormSSR id={params.id} />
        </ScaleFade>
      </Box>
    </CreditCardUseFormProvider>
  );
};

export default Page;
