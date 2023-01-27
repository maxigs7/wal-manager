import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '@chakra-ui/react';


import { es } from '@/i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@/layout';
import { CreditCardDialogRemove, CreditCardTableContainer } from '@/m/creditCard';
import { routes } from '@/routes';
import { Icon, Page, PageHeader } from '@/shared';

const CreditCardsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [idToRemove, setIdToRemove] = useState<string>();
  const { setBreadcrumb } = useFullLayout();
  const breadcrumb = useMemo(
    () => [
      { label: es.common.breadcrumbs.admin, link: routes.admin.index },
      { label: es.common.breadcrumbs.creditCards },
    ],
    [],
  );

  const onUpdate = useCallback(
    (id: string) => {
      router.push(routes.admin.creditCard.update(id));
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
        <Button
          as={NextLink}
          colorScheme="primary"
          href={routes.admin.creditCard.create}
          leftIcon={<Icon icon="plus" />}
          size="sm"
          textTransform="uppercase"
        >
          {es.common.create}
        </Button>
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
