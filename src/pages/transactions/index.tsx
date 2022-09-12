import { Button } from '@chakra-ui/react';
import compose from 'compose-function';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { es } from '@i18n';
import { getFullLayout, NextPageWithLayout } from '@layout';
import { DolarsiButtonToggle } from '@m/dolarsi';
import {
  TransactionMainFilterActions,
  TransactionTableContainer,
  useTransactionStore,
  withTransactionStore,
} from '@m/transaction';
import { TransactionType } from '@models';
import { Icon, Page, PageHeader } from '@shared';

const TransactionsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [state, dispatch] = useTransactionStore();

  const onRemove = useCallback((id: string) => {}, []);

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

  return (
    <Page>
      <PageHeader metaTitle={es.transaction.pages.index.metaTitle}>
        <Link as="/transactions/expenses/create" href={buildHref('expenses')} passHref>
          <Button as="a" colorScheme="red" leftIcon={<Icon icon="plus" />} size="sm">
            {es.transaction.actions.expenses}
          </Button>
        </Link>
        <Link as="/transactions/incomes/create" href={buildHref('incomes')} passHref>
          <Button as="a" colorScheme="green" leftIcon={<Icon icon="plus" />} size="sm">
            {es.transaction.actions.incomes}
          </Button>
        </Link>
        {state.account?.currency === 'usd' && (
          <DolarsiButtonToggle
            defaultLabel={es.transaction.actions.changeQuotation}
            onChangedQuotation={dispatch.onChangedQuotation}
            size="sm"
          />
        )}
      </PageHeader>

      <TransactionMainFilterActions p="3" />
      <TransactionTableContainer onRemove={onRemove} onUpdate={onUpdate} />
    </Page>
  );
};

const NextPage: NextPageWithLayout = compose(withTransactionStore)(TransactionsPage);

NextPage.getLayout = getFullLayout;

export default NextPage;
