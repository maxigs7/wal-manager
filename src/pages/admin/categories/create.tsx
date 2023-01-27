import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import { IconButton } from '@chakra-ui/react';


import { es } from '@/i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@/layout';
import { RootCategoryFormContainer, useCategorySelectAllRefresh } from '@/m/category';
import { routes } from '@/routes';
import { Icon, Page, PageHeader } from '@/shared';

const CreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setBreadcrumb } = useFullLayout();
  const refresh = useCategorySelectAllRefresh();

  const breadcrumb = useMemo(
    () => [
      { label: es.common.breadcrumbs.admin, link: routes.admin.index },
      { label: es.common.breadcrumbs.categories, link: routes.admin.category.index },
      { label: es.common.breadcrumbs.create },
    ],
    [],
  );

  const onConfirmed = () => {
    refresh();
    router.push(routes.admin.category.index);
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
      <RootCategoryFormContainer onConfirmed={onConfirmed} />
    </Page>
  );
};

CreatePage.getLayout = getFullLayout;

export default CreatePage;
