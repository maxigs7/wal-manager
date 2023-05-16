import { notFound } from 'next/navigation';

import { Text } from '@chakra-ui/react';

import { es } from '@/i18n';
import { Body } from '@/layout/modal-remove/body';
import { Footer } from '@/layout/modal-remove/footer';
import { Wrapper } from '@/layout/modal-remove/wrapper';
import { useUow } from '@/shared/api/server';

import { DeleteButton } from './delete-button';

export const revalidate = 0;
export const metadata = {
  title: es.account.pages.remove.title,
};

type AccountCheckingProps = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: AccountCheckingProps) => {
  const { account } = useUow();
  const data = await account.selectById(params.id);
  if (!data) {
    notFound();
  }

  return (
    <Wrapper title={es.account.pages.remove.title}>
      <Body>
        {es.account.pages.remove.warning.first}
        <Text as="strong" fontWeight="bold">
          {data.name}
        </Text>
        {es.account.pages.remove.warning.last}
      </Body>
      <Footer>
        <DeleteButton id={params.id} />
      </Footer>
    </Wrapper>
  );
};

export default Page;
