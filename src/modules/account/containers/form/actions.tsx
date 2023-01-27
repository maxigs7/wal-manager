import React from 'react';

import { Button, FlexProps } from '@chakra-ui/react';

import { es } from '@/i18n';
import { routes } from '@/routes';
import { ActionsFormContainer, Icon } from '@/shared';

interface IProps extends FlexProps {
  isLoading: boolean;
}

const Actions: React.FC<IProps> = ({ isLoading, ...flexProps }) => (
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

    <Button
      as="a"
      href={routes.admin.account.index}
      leftIcon={<Icon icon="times" />}
      size="sm"
      variant="outline"
    >
      {es.common.cancel}
    </Button>
  </ActionsFormContainer>
);

export default Actions;
