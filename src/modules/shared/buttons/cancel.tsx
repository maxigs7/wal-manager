import { Button, ButtonProps, Icon } from '@chakra-ui/react';

import { es } from '@/i18n';
import { CloseIcon } from '@/m/shared/icons';

type Props = ButtonProps;

const CancelButton: React.FC<Props> = ({
  colorScheme = 'accent',
  rounded = '2xl',
  shadow = 'md',
  size = 'sm',
  variant = 'outline',
  ...buttonProps
}) => {
  return (
    <Button
      colorScheme={colorScheme}
      leftIcon={<Icon as={CloseIcon} boxSize="3" />}
      rounded={rounded}
      shadow={shadow}
      size={size}
      variant={variant}
      {...buttonProps}
    >
      {es.common.cancel}
    </Button>
  );
};

export { CancelButton };
