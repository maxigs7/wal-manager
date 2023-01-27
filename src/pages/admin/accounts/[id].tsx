import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import { IconButton } from '@chakra-ui/react';


import { es } from '@/i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@/layout';
import { AccountFormContainer, useAccountSelectAllRefresh } from '@/m/account';
import { Account } from '@/models';
import { routes } from '@/routes';
import { Icon, Page, PageHeader } from '@/shared';

const UpdatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setBreadcrumb } = useFullLayout();
  const refresh = useAccountSelectAllRefresh();

  const breadcrumb = useMemo(
    () => [
      { label: es.common.breadcrumbs.admin, link: routes.admin.index },
      { label: es.common.breadcrumbs.accounts, link: routes.admin.account.index },
      { label: es.common.breadcrumbs.update },
    ],
    [],
  );

  const onConfirmed = (account: Account) => {
    refresh(account.id);
    router.push(routes.admin.account.index);
  };

  useEffect(() => {
    setBreadcrumb(breadcrumb);
  }, [breadcrumb, setBreadcrumb]);

  return (
    <Page>
      <PageHeader
        metaTitle={es.account.pages.update.metaTitle}
        title={es.account.pages.update.title}
      >
        <IconButton
          aria-label={es.common.goBack}
          as={NextLink}
          color="white"
          href={routes.admin.account.index}
          icon={<Icon icon="angle-left" size="2x" />}
          order="-1"
          variant="link"
        />
      </PageHeader>
      <AccountFormContainer id={router.query?.id as string} onConfirmed={onConfirmed} />
    </Page>
  );
};

UpdatePage.getLayout = getFullLayout;

export default UpdatePage;
