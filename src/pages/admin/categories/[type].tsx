import { Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { es } from '@i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@layout';
import {
  CategoryTableContainer,
  CategoryTypeTabs,
  useCategoryFilter,
  withCategoryFilter,
} from '@m/category';
import { CategoryType } from '@models';
import { Icon, Page, PageHeader } from '@shared';

const CategoriesPage: NextPageWithLayout = withCategoryFilter(() => {
  const router = useRouter();
  const [filters, dispatchFilters] = useCategoryFilter();
  const [idToRemove, setIdToRemove] = useState<string>();
  const { setBreadcrumb } = useFullLayout();
  const breadcrumb = useMemo(
    () => [
      { label: es.common.breadcrumbs.admin, link: '/admin' },
      { label: es.common.breadcrumbs.categories },
    ],
    [],
  );

  const onChangedTypeHandler = useCallback(
    (type: CategoryType) => {
      dispatchFilters.onChangedType(type);
      router.push(`/admin/categories/${type}`);
    },
    [dispatchFilters, router],
  );

  const onUpdate = useCallback(
    (id: string) => {
      router.push(`/admin/categories/${id}`);
    },
    [router],
  );

  const onRemove = useCallback((id: string) => {
    setIdToRemove(id);
  }, []);

  useEffect(() => {
    setBreadcrumb(breadcrumb);
  }, [breadcrumb, setBreadcrumb]);

  return (
    <Page>
      <PageHeader
        metaTitle={es.category.pages.index.metaTitle}
        title={es.category.pages.index.title}
      >
        <NextLink href="/admin/categories/create" passHref>
          <Button
            as="a"
            colorScheme="primary"
            leftIcon={<Icon icon="plus" />}
            size="sm"
            textTransform="uppercase"
          >
            {es.common.create}
          </Button>
        </NextLink>
      </PageHeader>

      <CategoryTypeTabs bg="white" onSelected={onChangedTypeHandler} selectedType={filters.type} />
      <CategoryTableContainer
        onRemove={onRemove}
        onUpdate={onUpdate}
        onSubCreate={function (parentId: string): void {
          throw new Error('Function not implemented.');
        }}
        onSubMove={function (parentId: string, id: string): void {
          throw new Error('Function not implemented.');
        }}
        onSubRemove={function (parentId: string, id: string): void {
          throw new Error('Function not implemented.');
        }}
        onSubUpdate={function (parentId: string, id: string): void {
          throw new Error('Function not implemented.');
        }}
      />
      {/* <CategoryDialogRemove
        id={idToRemove}
        isOpen={!!idToRemove}
        onDismiss={() => setIdToRemove(undefined)}
      /> */}
    </Page>
  );
});

CategoriesPage.getLayout = getFullLayout;

export default CategoriesPage;
