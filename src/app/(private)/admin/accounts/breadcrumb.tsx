'use client';
import React, { useEffect, useMemo } from 'react';

import { es } from '@/i18n';
import { useLayout } from '@/layout/full';
import { routes } from '@/routes';

const PageBreadcrumb: React.FC = () => {
  const { setBreadcrumb } = useLayout();
  const breadcrumb = useMemo(
    () => [
      { label: es.common.breadcrumbs.admin, link: routes.admin.index },
      { label: es.common.breadcrumbs.accounts },
    ],
    [],
  );

  useEffect(() => {
    setBreadcrumb(breadcrumb);
  }, [breadcrumb, setBreadcrumb]);

  return null;
};

export default PageBreadcrumb;
