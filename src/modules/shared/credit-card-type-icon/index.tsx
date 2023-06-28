import React from 'react';

import { IconProps } from '@chakra-ui/react';

import { AmexIcon, GenericIcon, MasterCardIcon, VisaIcon } from '@/m/shared/icons';
import { CreditCardType } from '@/models';

interface IProps extends Omit<IconProps, 'type'> {
  type: CreditCardType;
}

const CreditCardTypeIcon: React.FC<IProps> = ({ type, boxSize = 8, ...props }) => {
  switch (type) {
    case 'amex':
      return <AmexIcon boxSize={boxSize} {...props} />;
    case 'mastercard':
      return <MasterCardIcon boxSize={boxSize} {...props} />;
    case 'visa':
      return <VisaIcon boxSize={boxSize} {...props} />;
    default:
      return <GenericIcon boxSize={boxSize} {...props} />;
  }
};

export { CreditCardTypeIcon };
