import React from 'react';

import { es } from '@/i18n';
import { routes } from '@/routes';
import { PageWrapper, PageHeader, AddLinkButton } from '@/shared';
import { useUow } from '@/shared/server';

import PageBreadcrumb from './breadcrumb';

export default async function Page() {
  const { account } = useUow();
  const data = await account.select();
  console.log(data);
  // const router = useRouter();
  // const [idToRemove, setIdToRemove] = useState<string>();

  // const onUpdate = useCallback(
  //   (id: string) => {
  //     router.push(routes.admin.account.update(id));
  //   },
  //   [router],
  // );

  // const onRemove = useCallback((id: string) => {
  //   setIdToRemove(id);
  // }, []);

  return (
    <PageWrapper>
      <PageHeader title={es.account.pages.index.title}>
        <AddLinkButton href={routes.admin.account.create}>{es.common.create}</AddLinkButton>
      </PageHeader>
      <PageBreadcrumb />
      <pre>{JSON.stringify({ data }, null, 2)}</pre>
      {/* <AccountTableContainer onRemove={onRemove} onUpdate={onUpdate} />
      <AccountDialogRemove
        id={idToRemove}
        isOpen={!!idToRemove}
        onDismiss={() => setIdToRemove(undefined)}
      /> */}
    </PageWrapper>
  );
}
