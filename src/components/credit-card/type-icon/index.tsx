import React from 'react';

import { ReactComponent as AmexIcon } from '@assets/images/cc-amex.svg';
import { ReactComponent as GenericIcon } from '@assets/images/cc-generic.svg';
import { ReactComponent as MasterCardIcon } from '@assets/images/cc-mastercard.svg';
import { ReactComponent as VisaIcon } from '@assets/images/cc-visa.svg';
import { CreditCardType } from '@models/common';

const CreditCardTypeIcon: React.FC<IProps> = ({ type, ...props }) => (
  <>
    {type === CreditCardType.amex && <AmexIcon {...props} />}
    {type === CreditCardType.carrefour && <GenericIcon {...props} />}
    {type === CreditCardType.mastercard && <MasterCardIcon {...props} />}
    {type === CreditCardType.visa && <VisaIcon {...props} />}
  </>
);

interface IProps extends React.SVGProps<SVGSVGElement> {
  type: CreditCardType;
}

export { CreditCardTypeIcon };
