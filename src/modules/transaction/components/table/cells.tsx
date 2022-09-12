import { Flex, HStack } from '@chakra-ui/react';
import { CellContext } from '@tanstack/react-table';

import { formatToCurrency } from '@lib';
import { CategoryTag } from '@m/category';
import { CreditCardInline } from '@m/creditCard';
import { TransactionDto } from '@models';
import { Icon } from '@shared';

export const AccountableCell: React.FC<Pick<TransactionDto, 'amount'>> = ({ amount }) => {
  const valueFormatted = formatToCurrency(Math.abs(amount));
  const formatted = amount < 0 ? `(${valueFormatted})` : valueFormatted;
  return (
    <Flex>
      <Icon icon="dollar-sign" mr="auto" />
      {formatted}
    </Flex>
  );
};

export const CategoryCell: React.FC<CellContext<TransactionDto, string>> = ({
  row: { original },
}) => {
  if (!original.id) return null;

  return (
    <CategoryTag
      color={original.rootCategoryColor}
      icon={original.rootCategoryIcon}
      name={original.rootCategory}
      size="sm"
      subName={original.subCategory}
    />
  );
};

export const CreditCardCell: React.FC<CellContext<TransactionDto, string>> = ({
  row: { original },
  getValue,
}) => {
  if (!original.creditCardType) return null;

  return (
    <HStack align="center">
      <CreditCardInline iconWidth={25} name={getValue()} type={original.creditCardType} />
    </HStack>
  );
};

export const DescriptionCell: React.FC<CellContext<TransactionDto, string>> = ({
  row: { original },
  getValue,
}) => {
  if (!original.id) return <>{'BALANCE ACTUAL'}</>;

  return <>{getValue()}</>;
};
