import Link from 'next/link';
import React from 'react';

import { Button, FlexProps } from '@chakra-ui/react';
import { formatISO } from 'date-fns';

import { es } from '@i18n';
import { routes } from '@routes';
import { ActionsFormContainer, Icon } from '@shared';

interface IProps extends FlexProps {
  goBackUrl?: string;
  isLoading: boolean;
}

const Actions: React.FC<IProps> = ({ goBackUrl, isLoading, ...flexProps }) => (
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

    {goBackUrl && (
      <Link as={routes.movement.index} href={goBackUrl} legacyBehavior passHref>
        <Button leftIcon={<Icon icon="times" />} size="sm" variant="outline">
          {es.common.cancel}
        </Button>
      </Link>
    )}
  </ActionsFormContainer>
);

export default Actions;
