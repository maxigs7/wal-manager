import * as React from 'react';

import { Button } from '@app/modules/common';
import classnames from '@lib/classnames';
import { Colors } from '@lib/tailwind-css/colors';

import { DialogTypes, Types } from './types';

interface IProps {
  action?: () => void;
  actionText?: string;
  cancelText?: string;
  toggle: (isOpen: boolean) => void;
  type?: DialogTypes | Types;
}

const styles = {
  buttons: 'w-full',
  wrapper: 'grid grid-cols-1 md:grid-cols-2 gap-2',
};

const buttons = {
  [DialogTypes.DANGER]: Colors.RED,
  [DialogTypes.INFO]: Colors.BLUE,
  [DialogTypes.SUCCESS]: Colors.GREEN,
  [DialogTypes.WARNING]: Colors.YELLOW,
};

export const ButtonsAction: React.FC<IProps> = ({
  action,
  actionText,
  cancelText,
  toggle,
  type = DialogTypes.INFO,
}) => (
  <div className={classnames(actionText && action && cancelText && styles.wrapper)}>
    {actionText && action && (
      <Button className={styles.buttons} color={buttons[type]} onClick={() => action()}>
        {actionText}
      </Button>
    )}
    {cancelText && (
      <Button
        className={styles.buttons}
        color={Colors.BLUEGRAY}
        onClick={() => toggle(false)}
        outlined
      >
        {cancelText}
      </Button>
    )}
  </div>
);
