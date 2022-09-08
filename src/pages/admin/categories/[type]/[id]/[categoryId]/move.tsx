import { IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { es } from '@i18n';
import { getFullLayout, NextPageWithLayout } from '@layout';
import { SubCategoryMoveFormContainer, useCategoryRowsRefresh } from '@m/category';
import { Category, CategoryType } from '@models';
import { Icon, Page, PageHeader } from '@shared';

const MovePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id: parentId, categoryId: id, type } = router.query;
  const refresh = useCategoryRowsRefresh();
  const goBackUrl = `/admin/categories/${router.query.type}`;

  const onConfirmed = (category: Category) => {
    refresh(category.type, category.id);
    router.push(goBackUrl);
  };

  return (
    <Page>
      <PageHeader
        metaTitle={es.category.pages.update.metaTitle}
        title={es.category.pages.update.title}
      >
        <NextLink href={goBackUrl} passHref>
          <IconButton
            aria-label={es.common.goBack}
            as="a"
            color="white"
            icon={<Icon icon="angle-left" size="2x" />}
            order="-1"
            variant="link"
          />
        </NextLink>
      </PageHeader>
      <SubCategoryMoveFormContainer
        id={id as string}
        onConfirmed={onConfirmed}
        parentId={parentId as string}
        type={type as CategoryType}
      />
    </Page>
  );
};

MovePage.getLayout = getFullLayout;

export default MovePage;
