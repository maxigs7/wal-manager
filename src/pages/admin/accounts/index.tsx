import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '@chakra-ui/react';


import { es } from '@/i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@/layout';
import { AccountDialogRemove, AccountTableContainer } from '@/m/account';
import { routes } from '@/routes';
import { Icon, Page, PageHeader } from '@/shared';

const AccountsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [idToRemove, setIdToRemove] = useState<string>();
  const { setBreadcrumb } = useFullLayout();
  const breadcrumb = useMemo(
    () => [
      { label: es.common.breadcrumbs.admin, link: routes.admin.index },
      { label: es.common.breadcrumbs.accounts },
    ],
    [],
  );

  const onUpdate = useCallback(
    (id: string) => {
      router.push(routes.admin.account.update(id));
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
        <Button
          as={NextLink}
          colorScheme="primary"
          href={routes.admin.account.create}
          leftIcon={<Icon icon="plus" />}
          size="sm"
          textTransform="uppercase"
        >
          {es.common.create}
        </Button>
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
