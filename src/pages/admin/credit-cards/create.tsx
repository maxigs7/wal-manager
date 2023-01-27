import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import { IconButton } from '@chakra-ui/react';


import { es } from '@/i18n';
import { getFullLayout, NextPageWithLayout, useFullLayout } from '@/layout';
import { CreditCardFormContainer, useCreditCardSelectAllRefresh } from '@/m/creditCard';
import { routes } from '@/routes';
import { Icon, Page, PageHeader } from '@/shared';

const CreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setBreadcrumb } = useFullLayout();
  const refresh = useCreditCardSelectAllRefresh();

  const breadcrumb = useMemo(
    () => [
      { label: es.common.breadcrumbs.admin, link: routes.admin.index },
      { label: es.common.breadcrumbs.creditCards, link: routes.admin.creditCard.index },
      { label: es.common.breadcrumbs.create },
    ],
    [],
  );

  const onConfirmed = () => {
    refresh();
    router.push(routes.admin.creditCard.index);
  };

  useEffect(() => {
    setBreadcrumb(breadcrumb);
  }, [breadcrumb, setBreadcrumb]);

  return (
    <Page>
      <PageHeader
        metaTitle={es.creditCard.pages.create.metaTitle}
        title={es.creditCard.pages.create.title}
      >
        <IconButton
          aria-label={es.common.goBack}
          as={NextLink}
          color="white"
          href={routes.admin.creditCard.index}
          icon={<Icon icon="angle-left" size="2x" />}
          order="-1"
          variant="link"
        />
      </PageHeader>
      <CreditCardFormContainer onConfirmed={onConfirmed} />
    </Page>
  );
};

CreatePage.getLayout = getFullLayout;

export default CreatePage;
