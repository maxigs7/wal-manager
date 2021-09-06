import React from 'react';

import { Text } from '@chakra-ui/react';

import { EmptyMessage } from '@lib/wal-ui';

const SubCategoryListNoSelected: React.FC = React.memo(() => (
  <EmptyMessage color="gray.400">
    <Text my={5} size="2xl">
      Seleccione una categoria
    </Text>
  </EmptyMessage>
));

export { SubCategoryListNoSelected };
