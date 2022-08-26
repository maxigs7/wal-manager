import React, { useCallback } from 'react';
import { Outlet } from 'react-router-dom';

import { Button, Portal } from '@chakra-ui/react';
import compose from 'compose-function';

import {
  CategoryTableContainer,
  CategoryTypeTabs,
  useCategoryFilter,
  withCategoryFilter,
} from '@m/category';
import { CategoryType } from '@models';
import { Card, ExpandableFilter, Icon, Page, withTextFilter } from '@shared';

import { useCategoryNav, useCategoryRoutes } from './hooks';

const CategoriesPage: React.FC = () => {
  const routes = useCategoryRoutes();
  const [filters, dispatchFilters] = useCategoryFilter();
  const {
    goCreate,
    goIndex,
    goRemove,
    goSubCreate,
    goSubMove,
    goSubRemove,
    goSubUpdate,
    goUpdate,
  } = useCategoryNav();

  const onChangedTypeHandler = useCallback(
    (type: CategoryType) => {
      dispatchFilters.onChangedType(type);
      goIndex(type);
    },
    [dispatchFilters],
  );

  const onCreate = useCallback(() => {
    goCreate(filters.type);
  }, [goCreate]);

  const onRemove = useCallback(
    (id: string) => {
      goRemove(filters.type, id);
    },
    [goRemove],
  );

  const onSubCreate = useCallback(
    (id: string) => {
      goSubCreate(filters.type, id);
    },
    [goSubCreate, filters.type],
  );

  const onSubMove = useCallback(
    (parentId: string, id: string) => {
      goSubMove(filters.type, parentId, id);
    },
    [goSubCreate, filters.type],
  );

  const onSubRemove = useCallback(
    (parentId: string, id: string) => {
      goSubRemove(filters.type, parentId, id);
    },
    [goSubRemove, filters.type],
  );

  const onSubUpdate = useCallback(
    (parentId: string, id: string) => {
      goSubUpdate(filters.type, parentId, id);
    },
    [goSubUpdate, filters.type],
  );

  const onUpdate = useCallback(
    (id: string) => {
      goUpdate(filters.type, id);
    },
    [goUpdate, filters.type],
  );

  return (
    <>
      <Page metaTitle="Mis Categorias" title="Mis Categorias">
        <Card>
          <CategoryTypeTabs onSelected={onChangedTypeHandler} selectedType={filters.type} />
          <ExpandableFilter
            actions={
              <Button
                aria-label="Nuevo gasto"
                colorScheme={filters.type === 'expenses' ? 'red' : 'green'}
                leftIcon={<Icon icon="plus" />}
                onClick={onCreate}
                size="sm"
                w={['full', null]}
              >
                Nuevo {filters.type === 'expenses' ? 'Gasto' : 'Ingreso'}
              </Button>
            }
            onChangedText={dispatchFilters.onChangedText}
            text={filters.text}
          />
          <CategoryTableContainer
            onRemove={onRemove}
            onSubCreate={onSubCreate}
            onSubMove={onSubMove}
            onSubRemove={onSubRemove}
            onSubUpdate={onSubUpdate}
            onUpdate={onUpdate}
          />
        </Card>

        {routes}

        <Portal>
          <Outlet />
        </Portal>
      </Page>
    </>
  );
};

export default compose(withTextFilter, withCategoryFilter)(CategoriesPage);
