import { Flex, Input } from '@chakra-ui/react';

import { es } from '@/i18n';

interface IProps {
  globalFilter?: string;
  onChangedGlobalFilter?(filter: string): void;
}

const GlobalFilter: React.FC<IProps> = ({ globalFilter, onChangedGlobalFilter }) => {
  if (!onChangedGlobalFilter) return null;

  return (
    <Flex px="3" py="2">
      <Input
        maxW="md"
        onChange={(e) => onChangedGlobalFilter(e.target.value)}
        placeholder={es.common.globalFilterPlaceholder}
        value={globalFilter ?? ''}
      />
    </Flex>
  );
};

export default GlobalFilter;
