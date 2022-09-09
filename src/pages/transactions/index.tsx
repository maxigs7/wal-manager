import { Button } from '@chakra-ui/react';
import compose from 'compose-function';
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

  const goCreate = useCallback(
    (type: TransactionType) => {
      router.push(`/transactions/${type}/create`);
    },
    [router],
  );

  const onRemove = useCallback((id: string) => {}, []);

  const onUpdate = useCallback((id: string) => {}, []);

  return (
    <Page>
      <PageHeader metaTitle={es.transaction.pages.index.metaTitle}>
        <Button
          as="a"
          colorScheme="red"
          href={`/transactions/create/expenses`}
          leftIcon={<Icon icon="plus" />}
          size="sm"
        >
          {es.transaction.actions.expenses}
        </Button>
        <Button
          as="a"
          colorScheme="green"
          href={`/transactions/create/incomes`}
          leftIcon={<Icon icon="plus" />}
          size="sm"
        >
          {es.transaction.actions.incomes}
        </Button>

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
