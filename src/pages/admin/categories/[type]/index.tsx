import { Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { es } from '@i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@layout';
import {
  CategoryDialogRemove,
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

  // ROOT
  const onRemove = useCallback((id: string) => {
    setIdToRemove(id);
  }, []);

  const onUpdate = useCallback(
    (id: string) => {
      router.push(`/admin/categories/${filters.type}/${id}`);
    },
    [filters, router],
  );

  // SUB
  const onSubCreate = useCallback(
    (parentId: string) => {
      router.push(`/admin/categories/${filters.type}/${parentId}/create`);
    },
    [filters.type, router],
  );
  const onSubMove = useCallback(
    (parentId: string, id: string) => {
      router.push(`/admin/categories/${filters.type}/${parentId}/${id}/move`);
    },
    [filters.type, router],
  );
  const onSubRemove = useCallback((id: string) => {
    setIdToRemove(id);
  }, []);
  const onSubUpdate = useCallback(
    (parentId: string, id: string) => {
      router.push(`/admin/categories/${filters.type}/${parentId}/${id}`);
    },
    [filters.type, router],
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
        <NextLink href={`/admin/categories/${filters.type}/create`} passHref>
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
        onSubCreate={onSubCreate}
        onSubMove={onSubMove}
        onSubUpdate={onSubUpdate}
        onUpdate={onUpdate}
      />
      <CategoryDialogRemove
        id={idToRemove}
        isOpen={!!idToRemove}
        onDismiss={() => setIdToRemove(undefined)}
        type={filters.type as CategoryType}
      />
    </Page>
  );
});

CategoriesPage.getLayout = getFullLayout;

export default CategoriesPage;
