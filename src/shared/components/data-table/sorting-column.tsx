import { Icon, chakra } from '@chakra-ui/react';
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from '@heroicons/react/24/outline';
import { SortDirection } from '@tanstack/react-table';

interface IProps {
  direction?: SortDirection | false;
}

const SortingColumn: React.FC<IProps> = ({ direction }) => {
  if (!direction) return null;
  return (
    <chakra.span ml="auto" pl="4">
      {direction === 'desc' ? (
        <Icon as={ChevronDoubleDownIcon} />
      ) : (
        <Icon as={ChevronDoubleUpIcon} />
      )}
    </chakra.span>
  );
};

export default SortingColumn;
