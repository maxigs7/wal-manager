import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button, Flex } from '@chakra-ui/react';
import compose from 'compose-function';

import { es } from '@i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@layout';
import { DolarsiButtonToggle } from '@m/dolarsi';
import {
  CreditCardSummaryStats,
  SummaryStats,
  MovementDialogRemove,
  MovementMainFilterActions,
  MovementTableContainer,
  useMovementStore,
  withNeedAccount,
  withMovementStore,
  useMovementUpdateIsPaid,
} from '@m/movement';
import { routes } from '@routes';
import { Icon, Page, PageHeader } from '@shared';

const MovementsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setBreadcrumb } = useFullLayout();
  const [state, dispatch] = useMovementStore();
  const { mutateAsync } = useMovementUpdateIsPaid({
    accountId: state.accountId as string,
    month: state.month,
    year: state.year,
  });
  const [idToRemove, setIdToRemove] = useState<string>();
  const breadcrumb = useMemo(() => [{ label: es.common.breadcrumbs.movements }], []);

  // ROOT
  const onRemove = useCallback((id: string) => {
    setIdToRemove(id);
  }, []);

  const onUpdate = useCallback(
    (id: string) => {
      router.push(routes.movement.update(id));
    },
    [router],
  );

  const onUpdateIsPaid = useCallback(
    (id: string, checked: boolean) => {
      mutateAsync({ id, value: checked });
    },
    [mutateAsync],
  );

  useEffect(() => {
    setBreadcrumb(breadcrumb);
  }, [breadcrumb, setBreadcrumb]);

  useEffect(() => {
    if (router.query.accountId) {
      dispatch.onChangedAccount({ id: router.query.accountId as string });
    }
    if (router.query.month && router.query.year) {
      dispatch.onChangedMonthYear(
        parseInt(router.query.month as string, 10),
        parseInt(router.query.year as string, 10),
      );
    }
  }, [dispatch, router.query]);

  return (
    <Page>
      <PageHeader metaTitle={es.movement.pages.index.metaTitle}>
        <Flex gap="2" w="full" wrap="wrap">
          <Link
            as={routes.movement.create}
            href={`${routes.movement.create}?${state.querystring}`}
            legacyBehavior
            passHref
          >
            <Button
              colorScheme="primary"
              leftIcon={<Icon icon="plus" />}
              size="sm"
              w={{ base: 'full', md: 'auto' }}
            >
              {es.movement.actions.create}
            </Button>
          </Link>

          <DolarsiButtonToggle
            defaultLabel={es.movement.actions.changeQuotation}
            disabled={state.accountCurrency !== 'usd'}
            onChangedQuotation={dispatch.onChangedQuotation}
            size="sm"
            w={{ base: 'full', md: 'auto' }}
          />
        </Flex>
      </PageHeader>
      <MovementMainFilterActions p="3" />
      <SummaryStats />
      <CreditCardSummaryStats />
      <MovementTableContainer
        onRemove={onRemove}
        onUpdate={onUpdate}
        onUpdateIsPaid={onUpdateIsPaid}
      />
      <MovementDialogRemove
        id={idToRemove}
        isOpen={!!idToRemove}
        onDismiss={() => setIdToRemove(undefined)}
      />
    </Page>
  );
};

const NextPage: NextPageWithLayout = compose(withNeedAccount, withMovementStore)(MovementsPage);

NextPage.getLayout = getFullLayout;

export default NextPage;
