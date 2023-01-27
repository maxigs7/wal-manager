import React, { useEffect, useState } from 'react';

import { Button, ButtonProps, Text } from '@chakra-ui/react';

import { IDolarsi } from '@api';
import { es } from '@i18n';
import { formatToCurrency } from '@lib';
import { useDolarsi } from '@m/dolarsi';

interface IProps extends ButtonProps {
  defaultLabel: string;
  onChangedQuotation(quotation?: IDolarsi): void;
}

const DolarsiButtonToggle: React.FC<IProps> = ({
  defaultLabel,
  onChangedQuotation,
  ...buttonProps
}) => {
  const [quotation, setQuotation] = useState<IDolarsi>();
  const { data: dolarsi, isLoading } = useDolarsi();

  const onClick = () => {
    if (!dolarsi) return;

    if (!quotation) {
      setQuotation(dolarsi[0]);
      return;
    }

    const currentIndex = dolarsi.findIndex((d) => d.name === quotation?.name);
    const nextIndex = currentIndex === dolarsi.length - 1 ? undefined : currentIndex + 1;
    setQuotation(nextIndex ? dolarsi[nextIndex] : undefined);
  };

  useEffect(() => {
    onChangedQuotation(quotation);
  }, [quotation, onChangedQuotation]);

  return (
    <Button isLoading={isLoading} onClick={onClick} {...buttonProps}>
      {quotation?.name || defaultLabel}
      {quotation && (
        <Text as="strong" ml="1">
          ({formatToCurrency(quotation.price)})
        </Text>
      )}
    </Button>
  );
};

export { DolarsiButtonToggle };
