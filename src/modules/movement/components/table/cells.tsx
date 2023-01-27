import { Flex, HStack, Text } from '@chakra-ui/react';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { CellContext } from '@tanstack/react-table';

import { formatToCurrency } from '@lib';
import { CategoryTag } from '@m/category';
import { CreditCardInline } from '@m/creditCard';
import { GetMovementItem } from '@models';
import { Icon } from '@shared';

export const AccountableCell: React.FC<Pick<GetMovementItem, 'amount'>> = ({ amount }) => {
  const valueFormatted = formatToCurrency(Math.abs(amount));
  const formatted = amount < 0 ? `(${valueFormatted})` : valueFormatted;
  return (
    <Flex>
      <Icon icon="dollar-sign" mr="auto" />
      {formatted}
    </Flex>
  );
};

export const CategoryCell: React.FC<CellContext<GetMovementItem, string>> = ({
  row: { original },
}) => {
  if (!original.id) return null;

  return (
    <CategoryTag
      color={original.rootCategoryColor}
      icon={original.rootCategoryIcon as IconName}
      name={original.rootCategory}
      size="sm"
      subName={original.subCategory}
    />
  );
};

export const CreditCardCell: React.FC<CellContext<GetMovementItem, string>> = ({
  row: { original },
  getValue,
}) => {
  if (!original.creditCardType) return null;

  return (
    <HStack align="center">
      <CreditCardInline name={getValue()} type={original.creditCardType} />
    </HStack>
  );
};

export const DescriptionCell: React.FC<CellContext<GetMovementItem, string>> = ({
  row: { original },
}) => {
  if (!original.id) return null;

  return (
    <Text textOverflow="ellipsis" whiteSpace="nowrap">
      {original.description}
      {!!original.feeNumber &&
        original.totalFees > 1 &&
        ` ${original.feeNumber}/${original.totalFees}`}
    </Text>
  );
};
