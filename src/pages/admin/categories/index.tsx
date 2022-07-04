import React, { useCallback, useRef } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { Button, HStack, Portal, SimpleGrid } from '@chakra-ui/react';
import compose from 'compose-function';

import { useMediaQuery } from '@lib';
import {
  CategoryListContainer,
  CategoryTableContainer,
  CategoryTypeTabs,
  SubCategoryListContainer,
  useCategoryFilter,
  useCategoryStore,
  withCategoryFilter,
} from '@m/category';
import { Category, CategoryType } from '@models';
import { Card, ExpandableFilter, Icon, Page, withTextFilter } from '@shared';

import { useCategoryNav, useCategoryRoutes } from './hooks';

const CategoriesPage: React.FC = () => {
  const routes = useCategoryRoutes();
  const [filters, dispatchFilters] = useCategoryFilter();
  const { goCreate, goIndex, goRemove, goSubCreate, goSubRemove, goSubUpdate, goUpdate } =
    useCategoryNav();

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
            onSubRemove={onSubRemove}
            onSubUpdate={onSubUpdate}
            onUpdate={onUpdate}
          />
        </Card>
        {/* <SimpleGrid columns={[1, 1, 2]} spacing={3} templateColumns={['1', '1', '2fr 3fr']}>
          <CategoryListContainer
            onCreated={onCreate}
            onSelected={onRootSelected}
            onSelectedType={onSelectedType}
            selectedId={state.selected?.id}
            type={type as CategoryType}
          />
          <SubCategoryListContainer
            onCategoryDeleted={onRemove}
            onCategoryUpdated={onUpdate}
            onCreated={onSubCreate}
            onDeleted={onSubRemove}
            onUpdated={onSubUpdate}
            ref={subPanelRef}
            selected={state.selected}
          />
        </SimpleGrid> */}

        {routes}

        <Portal>
          <Outlet />
        </Portal>
      </Page>
    </>
  );
};

export default compose(withTextFilter, withCategoryFilter)(CategoriesPage);
