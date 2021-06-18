import * as React from 'react';

import { Button } from '@app/modules/common';
import classnames from '@lib/classnames';

import { DialogTypes, DialogTypesButtonColorsMap, Types } from '../types';

type Props = {
  action?: () => void;
  actionText?: string;
  cancelText?: string;
  toggle: (isOpen: boolean) => void;
  type?: DialogTypes | Types;
};

const styles = {
  buttons: 'w-full',
  wrapper: 'grid grid-cols-1 md:grid-cols-2 gap-2',
};

export const ButtonsAction: React.FC<Props> = ({
  action,
  actionText,
  cancelText,
  toggle,
  type = DialogTypes.INFO,
}) => (
  <div className={classnames(actionText && action && cancelText && styles.wrapper)}>
    {actionText && action && (
      <Button
        className={styles.buttons}
        color={DialogTypesButtonColorsMap[type]}
        onClick={() => action()}
      >
        {actionText}
      </Button>
    )}
    {cancelText && (
      <Button className={styles.buttons} color="bluegray" onClick={() => toggle(false)} outlined>
        {cancelText}
      </Button>
    )}
  </div>
);
