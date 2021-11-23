import { chakra } from '@chakra-ui/react';

import { Icon } from '@lib/chakra-ui';

const SortingColumn: React.FC<IProps> = ({ isSortedDesc = false }) => (
  <chakra.span pl="4">
    {isSortedDesc ? <Icon icon="angle-double-down" /> : <Icon icon="angle-double-up" />}
  </chakra.span>
);

interface IProps {
  isSortedDesc?: boolean;
}

export { SortingColumn };
