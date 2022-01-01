import React from 'react';

import { Text, Flex, FlexProps } from '@chakra-ui/react';

import { formatToCurrency } from '@shared';

import { ICreditCardSummary } from '../../model/hooks/useCreditCardSummary';

interface IProps extends FlexProps {
  creditCards: ICreditCardSummary[];
}

const Summary: React.FC<IProps> = ({ creditCards, ...props }) => (
  <>
    {creditCards.map((s) => (
      <Flex {...props} align="center" justify="space-around" key={s.cc}>
        <Text>
          <Text as="strong">{s.cc}:</Text> $ {formatToCurrency(s.amount)}
        </Text>
      </Flex>
    ))}
  </>
);

export default Summary;
