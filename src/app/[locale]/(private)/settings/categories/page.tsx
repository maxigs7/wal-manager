import 'server-only';

import { Flex } from '@chakra-ui/react';

import { es } from '@/i18n';
import { Title } from '@/layout/settings';
import { createServerClient } from '@/lib/supabase/create-server-client';
import { CategoryTableSSR } from '@/m/categories/category-table/table-ssr';
import { ModalManagerProvider } from '@/m/shared/modal-manager/provider';

import { CreateCategoryButton } from './create-button';
import { ModalsRegister } from './modals-register';

export const revalidate = 0;
export const metadata = {
  title: es.category.pages.index.metaTitle,
};

const Page = async () => {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <ModalManagerProvider>
      <ModalsRegister />
      <Flex>
        <Title>{es.category.pages.index.title}</Title>

        <CreateCategoryButton ml="auto" userId={session?.user?.id as string} />
      </Flex>
      <CategoryTableSSR />
    </ModalManagerProvider>
  );
};

export default Page;
