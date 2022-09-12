import { IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import { es } from '@i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@layout';
import { TransactionFormContainer, useTransactionListRefresh } from '@m/transaction';
import { TransactionType } from '@models';
import { Icon, Page, PageHeader } from '@shared';

const UpdatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setBreadcrumb } = useFullLayout();
  const refresh = useTransactionListRefresh();
  const id = router.query.id as string;
  const backUrl = `/transactions`;

  const breadcrumb = useMemo(
    () => [
      { label: es.common.breadcrumbs.transactions, link: backUrl },
      { label: es.common.breadcrumbs.update },
    ],
    [backUrl],
  );

  const onConfirmed = () => {
    refresh();
    router.push(backUrl);
  };

  useEffect(() => {
    setBreadcrumb(breadcrumb);
  }, [breadcrumb, setBreadcrumb]);

  return (
    <Page>
      <PageHeader
        metaTitle={es.transaction.pages.update.metaTitle}
        title={es.transaction.pages.update.title}
      >
        <NextLink href={backUrl} passHref>
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
      {id && <TransactionFormContainer id={router.query.id as string} onConfirmed={onConfirmed} />}
    </Page>
  );
};

UpdatePage.getLayout = getFullLayout;

export default UpdatePage;
