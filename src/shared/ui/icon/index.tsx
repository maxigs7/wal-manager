import React from 'react';

import { Icon as IconChakra, IconProps } from '@chakra-ui/react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export type WalIconProps = IconProps & FontAwesomeIconProps & React.ComponentProps<'svg'>;

const Icon: React.FC<WalIconProps> = (props) => <IconChakra as={FontAwesomeIcon} {...props} />;

export default React.memo(Icon);
