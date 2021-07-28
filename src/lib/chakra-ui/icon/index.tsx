import React from 'react';

import { Icon as IconChakra, IconProps } from '@chakra-ui/react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

type Props = IconProps & FontAwesomeIconProps & React.ComponentProps<'svg'>;

export const Icon: React.FC<Props> = React.memo((props) => {
  return <IconChakra as={FontAwesomeIcon} {...props} />;
});
