import React from 'react';

import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Listbox } from '@headlessui/react';

import classnames from '@lib/classnames';

export interface IIconListBoxOptionProps {
  icon: IconName;
}

const styles = {
  active: 'text-gray-500',
  normal: 'text-black',
  selected: 'text-gray-700',
};

const Option: React.FC<IIconListBoxOptionProps> = ({ icon }) => (
  <Listbox.Option as="div" value={icon}>
    {({ active, selected }) => (
      <FontAwesomeIcon
        className={classnames(
          !active && !selected && styles.normal,
          active && styles.active,
          selected && styles.selected,
        )}
        icon={icon}
        size="2x"
        fixedWidth
      />
    )}
  </Listbox.Option>
);

export default React.memo(Option);
