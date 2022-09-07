import { IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import { es } from '@i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@layout';
import { AccountFormContainer, useAccountListRefresh } from '@m/account';
import { Icon, Page, PageHeader } from '@shared';

const CreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setBreadcrumb } = useFullLayout();
  const refresh = useAccountListRefresh();

  const breadcrumb = useMemo(
    () => [
      { label: es.common.breadcrumbs.admin, link: '/admin' },
      { label: es.common.breadcrumbs.accounts, link: '/admin/accounts' },
      { label: es.common.breadcrumbs.create },
    ],
    [],
  );

  const onConfirmed = () => {
    refresh();
    router.push('/admin/accounts');
  };

  useEffect(() => {
    setBreadcrumb(breadcrumb);
  }, [breadcrumb, setBreadcrumb]);

  return (
    <Page>
      <PageHeader
        metaTitle={es.account.pages.create.metaTitle}
        title={es.account.pages.create.title}
      >
        <NextLink href="/admin/accounts" passHref>
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
      <AccountFormContainer onConfirmed={onConfirmed} />
    </Page>
  );
};

CreatePage.getLayout = getFullLayout;

export default CreatePage;
