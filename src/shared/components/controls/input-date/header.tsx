import { IconButton, Stack, Text } from '@chakra-ui/react';

import { Icon } from '../../icon';

const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: any) => {
  return (
    <Stack alignItems="center" pb={1} pl={4} pr={2} textAlign="left" isInline>
      <Text color="gray.700" flex={1} fontSize="sm" fontWeight="medium">
        {new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
        }).format(date)}
      </Text>
      <IconButton
        aria-label="Previous Month"
        borderRadius="full"
        disabled={prevMonthButtonDisabled}
        icon={<Icon fontSize="14px" icon="chevron-left" />}
        onClick={decreaseMonth}
        size="sm"
        variant="ghost"
      />
      <IconButton
        aria-label="Next Month"
        borderRadius="full"
        disabled={nextMonthButtonDisabled}
        icon={<Icon fontSize="14px" icon="chevron-right" />}
        onClick={increaseMonth}
        size="sm"
        variant="ghost"
      />
    </Stack>
  );
};

export { CustomHeader };
