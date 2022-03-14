import { chakra } from '@chakra-ui/react';

import Icon from '../../../icon';

interface IProps {
  isSortedDesc?: boolean;
}

const SortingColumn: React.FC<IProps> = ({ isSortedDesc = false }) => (
  <chakra.span pl="4">
    {isSortedDesc ? <Icon icon="angle-double-down" /> : <Icon icon="angle-double-up" />}
  </chakra.span>
);

export default SortingColumn;
