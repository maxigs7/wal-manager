import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import { IconButton } from '@chakra-ui/react';


import { es } from '@/i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@/layout';
import {
  convertQuerystring,
  MovementFormContainer,
  useMovementSelectAllRefresh,
  useMovementSelectSummaryRefresh,
  useMovementUpdate,
} from '@/m/movement';
import { Movement } from '@/models';
import { routes } from '@/routes';
import { Icon, Page, PageHeader } from '@/shared';

const UpdatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setBreadcrumb } = useFullLayout();
  const refreshList = useMovementSelectAllRefresh();
  const refreshSummary = useMovementSelectSummaryRefresh();
  const { mutateAsync } = useMovementUpdate();
  const id = router.query.id as string;

  const routeIndex = useMemo(
    () =>
      `${routes.movement.index}?${convertQuerystring({
        accountId: router.query.accountId as string,
        month: router.query.month as string,
        year: router.query.year as string,
      })}`,
    [router.query.accountId, router.query.month, router.query.year],
  );
  const breadcrumb = useMemo(
    () => [
      { label: es.common.breadcrumbs.movements, link: routeIndex, as: routes.movement.index },
      { label: es.common.breadcrumbs.update },
    ],
    [routeIndex],
  );

  const onConfirmed = (movement: Movement) => {
    refreshList(movement.accountId, movement.month, movement.year);
    refreshSummary(movement.accountId, movement.month, movement.year);
    router.push(
      `${routes.movement.index}?${convertQuerystring({
        accountId: movement.accountId,
        month: movement.month.toString(),
        year: movement.year.toString(),
      })}`,
      routes.movement.index,
    );
  };

  useEffect(() => {
    setBreadcrumb(breadcrumb);
  }, [breadcrumb, setBreadcrumb]);

  return (
    <Page>
      <PageHeader
        metaTitle={es.movement.pages.update.metaTitle}
        title={es.movement.pages.update.title}
      >
        <NextLink as={routes.movement.index} href={routeIndex} legacyBehavior passHref>
          <IconButton
            aria-label={es.common.goBack}
            color="white"
            icon={<Icon icon="angle-left" size="2x" />}
            order="-1"
            variant="link"
          />
        </NextLink>
      </PageHeader>
      {id && (
        <MovementFormContainer
          goBackUrl={routeIndex}
          id={router.query.id as string}
          onConfirmed={onConfirmed}
          onSubmit={mutateAsync}
        />
      )}
    </Page>
  );
};

UpdatePage.getLayout = getFullLayout;

export default UpdatePage;
