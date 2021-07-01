import React from 'react';

import { Switch } from '@headlessui/react';

import classnames from '@lib/classnames';

interface Props {
  enabled?: boolean;
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

const SwitchToggle: React.FC<Props> = ({
  enabled = true,
  label,
  labelPosition = 'right',
  toggle,
}) => {
  return (
    <Switch.Group>
      <div className={styles.switchContainer}>
        {label && labelPosition === 'left' && <Switch.Label className="mr-4">{label}</Switch.Label>}
        <Switch checked={enabled} className={styles.switch(enabled)} onChange={toggle}>
          <span className={styles.switchCircle(enabled)} />
        </Switch>
        {label && labelPosition === 'right' && (
          <Switch.Label className="ml-4">{label}</Switch.Label>
        )}
      </div>
    </Switch.Group>
  );
};

export default SwitchToggle;
