import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '@chakra-ui/react';


import { es } from '@/i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@/layout';
import { CategoryDialogRemove, CategoryTableContainer } from '@/m/category';
import { routes } from '@/routes';
import { Icon, Page, PageHeader } from '@/shared';

const CategoriesPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [idToRemove, setIdToRemove] = useState<string>();
  const { setBreadcrumb } = useFullLayout();
  const breadcrumb = useMemo(
    () => [
      { label: es.common.breadcrumbs.admin, link: '/admin' },
      { label: es.common.breadcrumbs.categories },
    ],
    [],
  );

  // ROOT
  const onRemove = useCallback((id: string) => {
    setIdToRemove(id);
  }, []);

  const onUpdate = useCallback(
    (id: string) => {
      router.push(routes.admin.category.update(id));
    },
    [router],
  );

  // SUB
  const onSubCreate = useCallback(
    (parentId: string) => {
      router.push(routes.admin.category.create(parentId));
    },
    [router],
  );
  const onSubMove = useCallback(
    (parentId: string, id: string) => {
      router.push(routes.admin.category.move(parentId, id));
    },
    [router],
  );

  const onSubUpdate = useCallback(
    (parentId: string, id: string) => {
      router.push(routes.admin.category.update(id, parentId));
    },
    [router],
  );

  useEffect(() => {
    setBreadcrumb(breadcrumb);
  }, [breadcrumb, setBreadcrumb]);

  return (
    <Page>
      <PageHeader
        metaTitle={es.category.pages.index.metaTitle}
        title={es.category.pages.index.title}
      >
        <Button
          as={NextLink}
          colorScheme="primary"
          href={routes.admin.category.create()}
          leftIcon={<Icon icon="plus" />}
          size="sm"
          textTransform="uppercase"
        >
          {es.common.create}
        </Button>
      </PageHeader>
      <CategoryTableContainer
        onRemove={onRemove}
        onSubCreate={onSubCreate}
        onSubMove={onSubMove}
        onSubUpdate={onSubUpdate}
        onUpdate={onUpdate}
      />
      <CategoryDialogRemove
        id={idToRemove}
        isOpen={!!idToRemove}
        onDismiss={() => setIdToRemove(undefined)}
      />
    </Page>
  );
};

CategoriesPage.getLayout = getFullLayout;

export default CategoriesPage;
