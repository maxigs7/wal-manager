import React, { useState } from 'react';

import { Switch } from '@headlessui/react';

import classnames from '@lib/classnames';

interface Props {
  enabled?: boolean;
  title?: string;
}

const styles = {
  switch: (enabled: boolean) =>
    classnames(
      'relative inline-flex items-center h-6 rounded-full w-11',
      enabled ? 'bg-primary-600' : 'bg-gray-200',
    ),
  switchCircle: (enabled: boolean) =>
    classnames(
      'inline-block w-4 h-4 bg-white rounded-full transform transition ease-in-out duration-200',
      enabled ? 'translate-x-6' : 'translate-x-1',
    ),
};

const SwitchToggle: React.FC<Props> = ({ enabled: isEnabled = true, title }) => {
  const [enabled, setEnabled] = useState(isEnabled);

  return (
    <Switch checked={enabled} className={styles.switch(enabled)} onChange={setEnabled}>
      {title && <span className="sr-only">Enable notifications</span>}
      <span className={styles.switchCircle(enabled)} />
    </Switch>
  );
};

export default SwitchToggle;
