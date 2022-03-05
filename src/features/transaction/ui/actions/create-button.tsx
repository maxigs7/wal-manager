import React, { useCallback, useMemo } from 'react';

import { Button, useWhyDidYouUpdate } from '@chakra-ui/react';
import { IconName } from '@fortawesome/fontawesome-svg-core';

import { TransactionType, useTransactionStore } from '@entities';
import { Icon } from '@shared';

interface IProps {
  goCreate(type: TransactionType, date?: Date): void;
  icon: IconName;
  label: string;
  type: TransactionType;
}

const ButtonIcon = React.memo(({ icon }: Pick<IProps, 'icon'>) => {
  return <Icon icon={icon} />;
});

const CreateButton: React.FC<IProps> = ({ goCreate, icon, label, type }) => {
  const [state] = useTransactionStore();
  const colorScheme = useMemo(() => {
    if (type === 'expenses') return 'red';

    return 'green';
  }, [type]);

  const onCreateHandler = useCallback(() => {
    goCreate(type, new Date(state.year, state.month));
  }, [goCreate, type]);

  useWhyDidYouUpdate('CreateButton', { goCreate, icon, label, type, state });

  return (
    <Button
      aria-label={label}
      colorScheme={colorScheme}
      leftIcon={<ButtonIcon icon={icon} />}
      onClick={onCreateHandler}
      size="sm"
    >
      {label}
    </Button>
  );
};

export default CreateButton;
