import { Button, Flex, IconButton } from '@chakra-ui/react';

import { Icon } from '@shared';

interface IProps {
  currentYear: number;
  onUpdateYear?(year: number): void;
}

const YearBar: React.FC<IProps> = ({ currentYear, onUpdateYear }) => {
  const onPrev = () => {
    onUpdateYear && onUpdateYear(currentYear - 1);
  };

  const onNext = () => {
    onUpdateYear && onUpdateYear(currentYear + 1);
  };

  return (
    <Flex borderBottom={1} borderBottomColor="gray.100" borderBottomStyle="solid" py={3}>
      <IconButton
        aria-label="Prev year"
        icon={<Icon icon="chevron-left" />}
        mr="auto"
        onClick={onPrev}
        variant="link"
      />

      <Button variant="link">{currentYear}</Button>

      <IconButton
        aria-label="Next year"
        icon={<Icon icon="chevron-right" />}
        ml="auto"
        onClick={onNext}
        variant="link"
      />
    </Flex>
  );
};

export default YearBar;
