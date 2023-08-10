import 'server-only';

import { Card, Flex } from '@chakra-ui/react';

import { es } from '@/i18n';
import { PageContainer, PageTitle } from '@/layout/full';
import { createServerClient } from '@/lib/supabase/create-server-client';
import { BackButtonLink, SaveButton } from '@/m/shared/buttons';

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
    <PageContainer>
      <PageTitle>{es.investment.pages.create.title}</PageTitle>
      <Flex>
        <SaveButton />
      </Flex>
      <Card as="form">Test</Card>
    </PageContainer>
  );
};

export default Page;
