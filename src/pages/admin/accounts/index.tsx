import { Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { useCallback, useEffect, useMemo } from 'react';

import { es } from '@i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@layout';
import { AccountTableContainer } from '@m/account';
import { Icon, Page, PageHeader } from '@shared';

const AccountsPage: NextPageWithLayout = () => {
  const breadcrumb = useMemo(() => [{ label: 'Admin', link: '/admin' }, { label: 'Cuentas' }], []);
  const { setBreadcrumb } = useFullLayout();

  useEffect(() => {
    setBreadcrumb(breadcrumb);
  }, [breadcrumb, setBreadcrumb]);

  const onUpdate = useCallback((id: string) => {}, []);

  const onRemove = useCallback((id: string) => {}, []);

  return (
    <Page>
      <PageHeader metaTitle={es.account.meta.title} title={es.account.title}>
        <NextLink href="/admin/accounts/create" passHref>
          <Button
            as="a"
            colorScheme="primary"
            leftIcon={<Icon icon="plus" />}
            size="sm"
            textTransform="uppercase"
          >
            CREAR
          </Button>
        </NextLink>
      </PageHeader>

      <AccountTableContainer onRemove={onRemove} onUpdate={onUpdate} />
    </Page>
  );
};

AccountsPage.getLayout = getFullLayout;

export default AccountsPage;
