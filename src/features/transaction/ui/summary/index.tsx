import React, { useEffect } from 'react';

import { Box, Collapse, Stack, IconButton, useDisclosure } from '@chakra-ui/react';

import {
  AccountBalance,
  CreditCardSummary,
  useAccountBalance,
  useCreditCardSummary,
} from '@entities';
import { ContentLoader, Icon } from '@shared';

interface IProps {
  endDate: Date;
  startDate: Date;
}

const Summary: React.FC<IProps> = ({ endDate, startDate }) => {
  const { data: balances, isLoading: isLoadingBalance } = useAccountBalance(startDate, endDate);
  const { data: creditCards, isLoading: isLoadingCreditCards } = useCreditCardSummary(
    startDate,
    endDate,
  );
  const { isOpen, onClose, onToggle } = useDisclosure();
  const icon = isOpen ? 'angle-double-up' : 'angle-double-down';

  useEffect(() => {
    onClose();
  }, [startDate]);

  if (isLoadingBalance || isLoadingCreditCards) {
    return <ContentLoader />;
  }

  return (
    <>
      <Box position="relative">
        <AccountBalance balances={balances || []} />
        <IconButton
          aria-label="Ver resumen"
          icon={<Icon icon={icon} />}
          onClick={onToggle}
          position="absolute"
          right="1"
          top="50%"
          transform="translateY(-50%)"
          variant="link"
        />
      </Box>
      <Collapse in={isOpen} animateOpacity>
        <Stack direction={['column', 'column', 'row']} gap="5" justify="center" p="3" wrap="wrap">
          <CreditCardSummary creditCards={creditCards || []} />
        </Stack>
      </Collapse>
    </>
  );
};

export default Summary;
