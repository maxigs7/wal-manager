import React from 'react';

import { HStack, Button, SimpleGrid } from '@chakra-ui/react';

import { CategoriesListCard, SubCategoriesListCard } from '@containers';
import { CategoryPortalModal } from '@containers/category/portal-modal';
import { Icon } from '@lib/chakra-ui';
import { Page } from '@lib/wal-ui';
import { CategoryType } from '@models';
import { useCategoriesStore } from '@stores';

const CategoriesPage: React.FC = () => {
  const [state, dispatch] = useCategoriesStore();

  return (
    <>
      <Page metaTitle="Mis Categorias" title="Mis Categorias">
        <HStack mb={2}>
          <Button
            aria-label="Nuevo gast"
            colorScheme="red"
            leftIcon={<Icon icon="plus" />}
            onClick={() => dispatch.onOpenForm(CategoryType.Expense)}
            size="sm"
          >
            Nuevo Gasto
          </Button>
          <Button
            aria-label="Nuevo ingreso"
            colorScheme="green"
            leftIcon={<Icon icon="plus" />}
            onClick={() => dispatch.onOpenForm(CategoryType.Income)}
            size="sm"
          >
            Nuevo Ingreso
          </Button>
        </HStack>
        <SimpleGrid columns={[1, 1, 2]} spacing={3} templateColumns={['1', '1', '2fr 3fr']}>
          <CategoriesListCard
            onCreated={() => dispatch.onOpenForm(state.selectedType)}
            onSelected={dispatch.onSelected}
            onSelectedType={dispatch.onSelectedType}
            selected={state.selected}
            type={state.selectedType}
          />
          <SubCategoriesListCard
            onCategoryDeleted={() =>
              dispatch.onOpenForm(state.selectedType, state.selected?.id, true)
            }
            onCategoryUpdated={() => dispatch.onOpenForm(state.selectedType, state.selected?.id)}
            selected={state.selected}
          />
        </SimpleGrid>
      </Page>
      <CategoryPortalModal
        id={state.id}
        isOpenForm={state.isOpenForm}
        isOpenRemove={state.isOpenRemove}
        onConfirmed={dispatch.onConfirmedForm}
        onDismiss={dispatch.onDismissForm}
        selectedType={state.selectedTypeForm as CategoryType}
      />
    </>
  );
};

export default CategoriesPage;
