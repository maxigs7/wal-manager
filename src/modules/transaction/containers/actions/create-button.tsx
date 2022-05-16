import React, { useCallback, useMemo } from 'react';

import { Button } from '@chakra-ui/react';
import { IconName } from '@fortawesome/fontawesome-svg-core';

import { TransactionType } from '@models';
import { Icon } from '@shared';

import { useTransactionStore } from '../../providers';

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
  }, [goCreate, state.month, state.year, type]);

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
