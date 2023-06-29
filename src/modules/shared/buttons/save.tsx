import { Button, ButtonProps, Icon } from '@chakra-ui/react';

import { es } from '@/i18n';
import { SaveIcon } from '@/m/shared/icons';

type Props = ButtonProps;

const SaveButton: React.FC<Props> = ({ colorScheme = 'accent', size = 'sm', ...buttonProps }) => {
  return (
    <Button
      colorScheme={colorScheme}
      leftIcon={<Icon as={SaveIcon} boxSize="3" />}
      rounded="2xl"
      size={size}
      {...buttonProps}
    >
      {es.common.save}
    </Button>
  );
};

export { SaveButton };
