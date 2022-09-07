import { IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { es } from '@i18n';
import { getFullLayout, NextPageWithLayout } from '@layout';
import { CreditCardFormContainer, useCreditCardListRefresh } from '@m/creditCard';
import { CreditCard } from '@models';
import { Icon, Page, PageHeader } from '@shared';

const UpdatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const refresh = useCreditCardListRefresh();

  const onConfirmed = (creditCard: CreditCard) => {
    refresh(creditCard.id);
    router.push('/admin/credit-cards');
  };

  return (
    <Page>
      <PageHeader
        metaTitle={es.creditCard.pages.update.metaTitle}
        title={es.creditCard.pages.update.title}
      >
        <NextLink href="/admin/credit-cards" passHref>
          <IconButton
            aria-label={es.common.goBack}
            as="a"
            color="white"
            icon={<Icon icon="angle-left" size="2x" />}
            order="-1"
            variant="link"
          />
        </NextLink>
      </PageHeader>
      <CreditCardFormContainer id={router.query?.id as string} onConfirmed={onConfirmed} />
    </Page>
  );
};

UpdatePage.getLayout = getFullLayout;

export default UpdatePage;
