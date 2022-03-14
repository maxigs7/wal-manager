import React, { useCallback, useRef } from 'react';
import { Outlet } from 'react-router-dom';

import { Button, HStack, Portal, SimpleGrid } from '@chakra-ui/react';

import { useMedia, useRouter } from '@lib';
import { CategoryListContainer, SubCategoryListContainer, useCategoryStore } from '@m/category';
import { Category, CategoryType } from '@models';
import { Icon, Page } from '@shared';

import { useCategoryNav, useCategoryRoutes } from './hooks';

const CategoriesPage: React.FC = () => {
  const routes = useCategoryRoutes();
  const { xs, sm } = useMedia();
  const {
    params: { type },
  } = useRouter();
  const { goCreate, goIndex, goRemove, goSubCreate, goSubRemove, goSubUpdate, goUpdate } =
    useCategoryNav();
  const [state, dispatch] = useCategoryStore();
  const subPanelRef = useRef<HTMLDivElement>(null);

  const onCreate = useCallback(
    (pType?: CategoryType) => {
      goCreate(pType || (type as CategoryType));
    },
    [goCreate],
  );

  const onSelectedType = useCallback(
    (type: CategoryType) => {
      goIndex(type);
    },
    [goIndex],
  );

  const onRemove = useCallback(
    (id: string) => {
      goRemove(type as CategoryType, id);
    },
    [goRemove],
  );

  const onSubCreate = useCallback(() => {
    goSubCreate(type as CategoryType, state.selected?.id as string);
  }, [goSubCreate, state.selected?.id]);

  const onSubRemove = useCallback(
    (id: string) => {
      goSubRemove(type as CategoryType, state.selected?.id as string, id);
    },
    [goSubRemove, state.selected?.id],
  );

  const onSubUpdate = useCallback(
    (id: string) => {
      goSubUpdate(type as CategoryType, state.selected?.id as string, id);
    },
    [goSubUpdate, state.selected?.id],
  );

  const onUpdate = useCallback(
    (id: string) => {
      goUpdate(type as CategoryType, id);
    },
    [goUpdate],
  );

  const onRootSelected = useCallback(
    (category: Category) => {
      if (subPanelRef.current && (xs || sm)) {
        subPanelRef.current.scrollIntoView();
      }
      dispatch.onSelected(category);
    },
    [dispatch, sm, subPanelRef, xs],
  );

  return (
    <>
      <Page metaTitle="Mis Categorias" title="Mis Categorias">
        <HStack mb={2}>
          <Button
            aria-label="Nuevo gasto"
            colorScheme="red"
            leftIcon={<Icon icon="plus" />}
            onClick={() => onCreate('expenses')}
            size="sm"
          >
            Nuevo Gasto
          </Button>
          <Button
            aria-label="Nuevo ingreso"
            colorScheme="green"
            leftIcon={<Icon icon="plus" />}
            onClick={() => onCreate('incomes')}
            size="sm"
          >
            Nuevo Ingreso
          </Button>
        </HStack>
        <SimpleGrid columns={[1, 1, 2]} spacing={3} templateColumns={['1', '1', '2fr 3fr']}>
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
        </SimpleGrid>

        {routes}

        <Portal>
          <Outlet />
        </Portal>
      </Page>
    </>
  );
};

export default CategoriesPage;
