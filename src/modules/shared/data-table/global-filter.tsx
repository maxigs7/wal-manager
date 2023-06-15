import { Flex, FlexProps, Input } from '@chakra-ui/react';

import { es } from '@/i18n';

type Props = {
  globalFilter?: string;
  onChangedGlobalFilter?(filter: string): void;
} & FlexProps;

const GlobalFilter: React.FC<Props> = ({ globalFilter, onChangedGlobalFilter, ...flexProps }) => {
  if (!onChangedGlobalFilter) return null;

  return (
    <Flex px="3" py="2" {...flexProps}>
      <Input
        maxW="md"
        onChange={(e) => onChangedGlobalFilter(e.target.value)}
        placeholder={es.common.globalFilterPlaceholder}
        size="sm"
        value={globalFilter ?? ''}
      />
    </Flex>
  );
};

export default GlobalFilter;
