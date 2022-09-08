import { IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import { es } from '@i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@layout';
import { RootCategoryFormContainer, useCategoryRowsRefresh } from '@m/category';
import { CategoryType } from '@models';
import { Icon, Page, PageHeader } from '@shared';

const CreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setBreadcrumb } = useFullLayout();
  const refresh = useCategoryRowsRefresh();
  const type = router.query.type as CategoryType;
  const backUrl = `/admin/categories/${type}`;

  const breadcrumb = useMemo(
    () => [
      { label: es.common.breadcrumbs.admin, link: '/admin' },
      { label: es.common.breadcrumbs.categories, link: backUrl },
      { label: es.common.breadcrumbs.create },
    ],
    [backUrl],
  );

  const onConfirmed = () => {
    refresh(type);
    router.push(backUrl);
  };

  useEffect(() => {
    setBreadcrumb(breadcrumb);
  }, [breadcrumb, setBreadcrumb]);

  return (
    <Page>
      <PageHeader
        metaTitle={es.category.pages.create.metaTitle}
        title={es.category.pages.create.title}
      >
        <NextLink href={backUrl} passHref>
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
      <RootCategoryFormContainer onConfirmed={onConfirmed} type={type} />
    </Page>
  );
};

CreatePage.getLayout = getFullLayout;

export default CreatePage;
