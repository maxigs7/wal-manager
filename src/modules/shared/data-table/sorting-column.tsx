import { Icon, chakra } from '@chakra-ui/react';
import { SortDirection } from '@tanstack/react-table';

import { SortDescIcon } from '@/m/shared/icons';

type Props = {
  direction?: SortDirection | false;
};

const SortingColumn: React.FC<Props> = ({ direction }) => {
  if (!direction) return null;
  return (
    <chakra.span ml="auto" pl="4">
      <Icon
        as={SortDescIcon}
        boxSize="4"
        transform={`rotate(${direction === 'desc' ? '0' : '180deg'})`}
      />
    </chakra.span>
  );
};

export default SortingColumn;
