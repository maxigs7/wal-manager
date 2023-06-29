import { Button, ButtonProps, Icon } from '@chakra-ui/react';

import { es } from '@/i18n';
import { TrashIcon } from '@/m/shared/icons';

type Props = ButtonProps;

const DeleteButton: React.FC<Props> = ({ colorScheme = 'danger', size = 'sm', ...buttonProps }) => {
  return (
    <Button
      colorScheme={colorScheme}
      leftIcon={<Icon as={TrashIcon} boxSize="3" />}
      rounded="2xl"
      size={size}
      {...buttonProps}
    >
      {es.common.remove}
    </Button>
  );
};

export { DeleteButton };
