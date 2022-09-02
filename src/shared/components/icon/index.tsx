import { Icon as IconChakra, IconProps } from '@chakra-ui/react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import React from 'react';

export type WalIconProps = IconProps & FontAwesomeIconProps & React.ComponentProps<'svg'>;

const Icon: React.FC<WalIconProps> = React.memo((props) => (
  <IconChakra as={FontAwesomeIcon} {...props} />
));

Icon.displayName = 'Icon';

export { Icon };
