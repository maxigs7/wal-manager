import React from 'react';

import { CreditCardType } from '@entities';
import { AmexIcon, GenericIcon, MasterCardIcon, VisaIcon } from '@shared';

interface IProps extends React.SVGProps<SVGSVGElement> {
  type: CreditCardType;
}

const TypeIcon: React.FC<IProps> = ({ type, ...props }) => {
  switch (type) {
    case 'amex':
      return <AmexIcon {...props} />;
    case 'mastercard':
      return <MasterCardIcon {...props} />;
    case 'visa':
      return <VisaIcon {...props} />;
    default:
      return <GenericIcon {...props} />;
  }
};

export default TypeIcon;
