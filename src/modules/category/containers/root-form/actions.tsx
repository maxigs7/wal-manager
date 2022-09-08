import { Button, FlexProps } from '@chakra-ui/react';
import React from 'react';

import { es } from '@i18n';
import { CategoryType } from '@models';
import { ActionsFormContainer, Icon } from '@shared';

interface IProps extends FlexProps {
  isLoading: boolean;
  type: CategoryType;
}

const Actions: React.FC<IProps> = ({ isLoading, type, ...flexProps }) => (
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
      href={`/admin/categories/${type}`}
      leftIcon={<Icon icon="times" />}
      size="sm"
      variant="outline"
    >
      {es.common.cancel}
    </Button>
  </ActionsFormContainer>
);

export default Actions;
