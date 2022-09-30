import { Button, FlexProps } from '@chakra-ui/react';
import { formatISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';

import { es } from '@i18n';
import { ActionsFormContainer, Icon } from '@shared';

interface IProps extends FlexProps {
  accountId?: string;
  date: Date;
  isLoading: boolean;
}

const Actions: React.FC<IProps> = ({ accountId, date, isLoading, ...flexProps }) => (
  <ActionsFormContainer {...flexProps}>
    <Button
      colorScheme="success"
      isLoading={isLoading}
      leftIcon={<Icon icon="save" />}
      size="sm"
      type="submit"
    >
      {es.common.save}
    </Button>

    <Link
      as="/transactions"
      href={`/transactions?date=${date && formatISO(date)}&accountId=${accountId}`}
      passHref
    >
      <Button as="a" leftIcon={<Icon icon="times" />} size="sm" variant="outline">
        {es.common.cancel}
      </Button>
    </Link>
  </ActionsFormContainer>
);

export default Actions;
