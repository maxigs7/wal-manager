import { chakra } from '@chakra-ui/react';
import { SortDirection } from '@tanstack/react-table';

import { Icon } from '../icon';

interface IProps {
  direction?: SortDirection | false;
}

const SortingColumn: React.FC<IProps> = ({ direction }) => {
  if (!direction) return null;
  return (
    <chakra.span ml="auto" pl="4">
      {direction === 'desc' ? <Icon icon="angle-double-down" /> : <Icon icon="angle-double-up" />}
    </chakra.span>
  );
};

export default SortingColumn;
