import { Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { es } from '@i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@layout';
import { CreditCardDialogRemove, CreditCardTableContainer } from '@m/creditCard';
import { Icon, Page, PageHeader } from '@shared';

const CreditCardsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [idToRemove, setIdToRemove] = useState<string>();
  const { setBreadcrumb } = useFullLayout();
  const breadcrumb = useMemo(
    () => [
      { label: es.common.breadcrumbs.admin, link: '/admin' },
      { label: es.common.breadcrumbs.creditCards },
    ],
    [],
  );

  const onUpdate = useCallback(
    (id: string) => {
      router.push(`/admin/credit-cards/${id}`);
    },
    [router],
  );

  const onRemove = useCallback((id: string) => {
    setIdToRemove(id);
  }, []);

  useEffect(() => {
    setBreadcrumb(breadcrumb);
  }, [breadcrumb, setBreadcrumb]);

  return (
    <Page>
      <PageHeader
        metaTitle={es.creditCard.pages.index.metaTitle}
        title={es.creditCard.pages.index.title}
      >
        <NextLink href="/admin/credit-cards/create" passHref>
          <Button
            as="a"
            colorScheme="primary"
            leftIcon={<Icon icon="plus" />}
            size="sm"
            textTransform="uppercase"
          >
            {es.common.create}
          </Button>
        </NextLink>
      </PageHeader>

      <CreditCardTableContainer onRemove={onRemove} onUpdate={onUpdate} />
      <CreditCardDialogRemove
        id={idToRemove}
        isOpen={!!idToRemove}
        onDismiss={() => setIdToRemove(undefined)}
      />
    </Page>
  );
};

CreditCardsPage.getLayout = getFullLayout;

export default CreditCardsPage;
