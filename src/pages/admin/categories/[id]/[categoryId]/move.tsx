import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import { IconButton } from '@chakra-ui/react';


import { es } from '@/i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@/layout';
import { SubCategoryMoveFormContainer, useCategorySelectAllRefresh } from '@/m/category';
import { Category } from '@/models';
import { routes } from '@/routes';
import { Icon, Page, PageHeader } from '@/shared';

const MovePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setBreadcrumb } = useFullLayout();
  const refresh = useCategorySelectAllRefresh();
  const { id: parentId, categoryId: id } = router.query;

  const breadcrumb = useMemo(
    () => [
      { label: es.common.breadcrumbs.admin, link: routes.admin.index },
      { label: es.common.breadcrumbs.categories, link: routes.admin.category.index },
      { label: es.category.pages.move.breadcrumb },
    ],
    [],
  );

  const onConfirmed = (category: Category) => {
    refresh(category.id);
    router.push(routes.admin.category.index);
  };

  useEffect(() => {
    setBreadcrumb(breadcrumb);
  }, [breadcrumb, setBreadcrumb]);

  return (
    <Page>
      <PageHeader metaTitle={es.category.pages.move.metaTitle} title={es.category.pages.move.title}>
        <IconButton
          aria-label={es.common.goBack}
          as={NextLink}
          color="white"
          href={routes.admin.category.index}
          icon={<Icon icon="angle-left" size="2x" />}
          order="-1"
          variant="link"
        />
      </PageHeader>
      <SubCategoryMoveFormContainer
        id={id as string}
        onConfirmed={onConfirmed}
        parentId={parentId as string}
      />
    </Page>
  );
};

MovePage.getLayout = getFullLayout;

export default MovePage;
