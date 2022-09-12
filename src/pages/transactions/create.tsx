import { IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import { es } from '@i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@layout';
import { TransactionFormContainer, useTransactionListRefresh } from '@m/transaction';
import { TransactionType } from '@models';
import { Icon, Page, PageHeader } from '@shared';

const CreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setBreadcrumb } = useFullLayout();
  const refresh = useTransactionListRefresh();
  const type = router.query.type as TransactionType;
  const backUrl = `/transactions`;

  const breadcrumb = useMemo(
    () => [
      { label: es.common.breadcrumbs.transactions, link: backUrl },
      { label: es.common.breadcrumbs.create },
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
        metaTitle={es.transaction.pages.create.metaTitle}
        title={es.transaction.pages.create.title}
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
      {type && (
        <TransactionFormContainer
          accountId={router.query.accountId as string}
          onConfirmed={onConfirmed}
          type={type}
        />
      )}
    </Page>
  );
};

CreatePage.getLayout = getFullLayout;

export default CreatePage;
