import { Button, Flex } from '@chakra-ui/react';
import compose from 'compose-function';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { es } from '@i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@layout';
import { DolarsiButtonToggle } from '@m/dolarsi';
import {
  CreditCardSummaryStats,
  SummaryStats,
  TransactionDialogRemove,
  TransactionMainFilterActions,
  TransactionTableContainer,
  useTransactionStore,
  withTransactionStore,
} from '@m/transaction';
import { TransactionType } from '@models';
import { Icon, Page, PageHeader } from '@shared';

const TransactionsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setBreadcrumb } = useFullLayout();
  const [state, dispatch] = useTransactionStore();
  const [idToRemove, setIdToRemove] = useState<string>();
  const breadcrumb = useMemo(() => [{ label: es.common.breadcrumbs.transactions }], []);

  // ROOT
  const onRemove = useCallback((id: string) => {
    setIdToRemove(id);
  }, []);

  const onUpdate = useCallback(
    (id: string) => {
      router.push(`/transactions/${id}`);
    },
    [router],
  );

  const buildHref = useCallback(
    (type: TransactionType) => {
      return `/transactions/create?accountId=${state.account?.id}&type=${type}`;
    },
    [state.account?.id],
  );

  useEffect(() => {
    setBreadcrumb(breadcrumb);
  }, [breadcrumb, setBreadcrumb]);

  return (
    <Page>
      <PageHeader metaTitle={es.transaction.pages.index.metaTitle}>
        <Flex gap="2" w="full" wrap="wrap">
          <Link as="/transactions/expenses/create" href={buildHref('expenses')} passHref>
            <Button
              as="a"
              colorScheme="red"
              leftIcon={<Icon icon="plus" />}
              size="sm"
              w={{ base: 'full', md: 'auto' }}
            >
              {es.transaction.actions.expenses}
            </Button>
          </Link>
          <Link as="/transactions/incomes/create" href={buildHref('incomes')} passHref>
            <Button
              as="a"
              colorScheme="green"
              leftIcon={<Icon icon="plus" />}
              size="sm"
              w={{ base: 'full', md: 'auto' }}
            >
              {es.transaction.actions.incomes}
            </Button>
          </Link>
          {state.account?.currency === 'usd' && (
            <DolarsiButtonToggle
              defaultLabel={es.transaction.actions.changeQuotation}
              onChangedQuotation={dispatch.onChangedQuotation}
              size="sm"
              w={{ base: 'full', md: 'auto' }}
            />
          )}
        </Flex>
      </PageHeader>
      <TransactionMainFilterActions p="3" />
      <SummaryStats />
      <CreditCardSummaryStats />
      <TransactionTableContainer onRemove={onRemove} onUpdate={onUpdate} />
      <TransactionDialogRemove
        id={idToRemove}
        isOpen={!!idToRemove}
        onDismiss={() => setIdToRemove(undefined)}
      />
    </Page>
  );
};

const NextPage: NextPageWithLayout = compose(withTransactionStore)(TransactionsPage);

NextPage.getLayout = getFullLayout;

export default NextPage;
