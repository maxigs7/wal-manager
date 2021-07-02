import React from 'react';

import { Switch } from '@headlessui/react';

import classnames from '@lib/classnames';
import { inputDisabled } from '@lib/tailwind-css';

interface IProps {
  enabled?: boolean;
  disabled?: boolean;
  label?: string;
  labelPosition?: 'left' | 'right';
  toggle: (state: boolean) => void;
}

const styles = {
  switch: (enabled: boolean) =>
    classnames(
      'relative inline-flex items-center h-6 rounded-full w-11',
      enabled ? 'bg-primary-600' : 'bg-gray-200',
    ),
  switchContainer: 'flex items-center',
  switchCircle: (enabled: boolean) =>
    classnames(
      'inline-block w-4 h-4 bg-white rounded-full transform transition ease-in-out duration-200',
      enabled ? 'translate-x-6' : 'translate-x-1',
    ),
};

const SwitchToggle: React.FC<IProps> = ({
  enabled = true,
  disabled = false,
  label,
  labelPosition = 'right',
  toggle,
}) => {
  const onChange = (value: boolean) => {
    if (disabled) return;
    toggle(value);
  };
  return (
    <Switch.Group>
      <div className={classnames(styles.switchContainer, disabled && inputDisabled)}>
        {label && labelPosition === 'left' && <Switch.Label className="mr-4">{label}</Switch.Label>}
        <Switch
          checked={enabled}
          className={classnames(styles.switch(enabled), disabled && inputDisabled)}
          onChange={onChange}
        >
          <span className={styles.switchCircle(enabled)} />
        </Switch>
        {label && labelPosition === 'right' && (
          <Switch.Label className={classnames('ml-4', disabled && inputDisabled)}>
            {label}
          </Switch.Label>
        )}
      </div>
    </Switch.Group>
  );
};

export default React.memo(SwitchToggle);
