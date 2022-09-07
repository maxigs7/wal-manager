import { IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import { es } from '@i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@layout';
import { CreditCardFormContainer, useCreditCardListRefresh } from '@m/creditCard';
import { Icon, Page, PageHeader } from '@shared';

const CreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setBreadcrumb } = useFullLayout();
  const refresh = useCreditCardListRefresh();

  const breadcrumb = useMemo(
    () => [
      { label: es.common.breadcrumbs.admin, link: '/admin' },
      { label: es.common.breadcrumbs.creditCards, link: '/admin/credit-cards' },
      { label: es.common.breadcrumbs.create },
    ],
    [],
  );

  const onConfirmed = () => {
    refresh();
    router.push('/admin/credit-cards');
  };

  useEffect(() => {
    setBreadcrumb(breadcrumb);
  }, [breadcrumb, setBreadcrumb]);

  return (
    <Page>
      <PageHeader
        metaTitle={es.creditCard.pages.create.metaTitle}
        title={es.creditCard.pages.create.title}
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
      <CreditCardFormContainer onConfirmed={onConfirmed} />
    </Page>
  );
};

CreatePage.getLayout = getFullLayout;

export default CreatePage;
