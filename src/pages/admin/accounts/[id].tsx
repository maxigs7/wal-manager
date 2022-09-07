import { IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { es } from '@i18n';
import { getFullLayout, NextPageWithLayout } from '@layout';
import { AccountFormContainer, useAccountListRefresh } from '@m/account';
import { Account } from '@models';
import { Icon, Page, PageHeader } from '@shared';

const UpdatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const refresh = useAccountListRefresh();

  const onConfirmed = (account: Account) => {
    refresh(account.id);
    router.push('/admin/accounts');
  };

  return (
    <Page>
      <PageHeader
        metaTitle={es.account.pages.update.metaTitle}
        title={es.account.pages.update.title}
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
      <AccountFormContainer id={router.query?.id as string} onConfirmed={onConfirmed} />
    </Page>
  );
};

UpdatePage.getLayout = getFullLayout;

export default UpdatePage;
