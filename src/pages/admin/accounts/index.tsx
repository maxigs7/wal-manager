import { Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { es } from '@i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@layout';
import { AccountDialogRemove, AccountTableContainer } from '@m/account';
import { Icon, Page, PageHeader } from '@shared';

const AccountsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [idToRemove, setIdToRemove] = useState<string>();
  const { setBreadcrumb } = useFullLayout();
  const breadcrumb = useMemo(() => [{ label: 'Admin', link: '/admin' }, { label: 'Cuentas' }], []);

  const onUpdate = useCallback(
    (id: string) => {
      router.push(`/admin/accounts/${id}`);
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
      <PageHeader metaTitle={es.account.pages.index.metaTitle} title={es.account.pages.index.title}>
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
      <AccountDialogRemove
        id={idToRemove}
        isOpen={!!idToRemove}
        onDismiss={() => setIdToRemove(undefined)}
      />
    </Page>
  );
};

AccountsPage.getLayout = getFullLayout;

export default AccountsPage;
