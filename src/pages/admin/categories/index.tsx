import React, { useCallback } from 'react';
import { Outlet } from 'react-router-dom';

import { Button, HStack, Portal, SimpleGrid } from '@chakra-ui/react';

import { CategoryType } from '@entities';
import { CategoryList, SubCategoryList, useCategoryStore } from '@features';
import { Icon, Page, useRouter } from '@shared';

import { useCategoryNav, useCategoryRoutes } from './hooks';

const CategoriesPage: React.FC = () => {
  const routes = useCategoryRoutes();
  const {
    params: { type },
  } = useRouter();
  const { goCreate, goIndex, goRemove, goSubCreate, goSubRemove, goSubUpdate, goUpdate } =
    useCategoryNav();
  const [state, dispatch] = useCategoryStore();

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

  return (
    <>
      <Page metaTitle="Mis Categorias" title="Mis Categorias">
        <HStack mb={2}>
          <Button
            aria-label="Nuevo gasto"
            bg="red.400"
            color="white"
            leftIcon={<Icon icon="plus" />}
            onClick={() => onCreate(CategoryType.Expense)}
            size="sm"
          >
            Nuevo Gasto
          </Button>
          <Button
            aria-label="Nuevo ingreso"
            bg="green.400"
            color="white"
            leftIcon={<Icon icon="plus" />}
            onClick={() => onCreate(CategoryType.Income)}
            size="sm"
          >
            Nuevo Ingreso
          </Button>
        </HStack>
        <SimpleGrid columns={[1, 1, 2]} spacing={3} templateColumns={['1', '1', '2fr 3fr']}>
          <CategoryList
            onCreated={onCreate}
            onSelected={dispatch.onSelected}
            onSelectedType={onSelectedType}
            selectedId={state.selected?.id}
            type={type as CategoryType}
          />
          <SubCategoryList
            onCategoryDeleted={onRemove}
            onCategoryUpdated={onUpdate}
            onCreated={onSubCreate}
            onDeleted={onSubRemove}
            onUpdated={onSubUpdate}
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
