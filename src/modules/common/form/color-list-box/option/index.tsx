import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Listbox } from '@headlessui/react';

import { ColorCircle } from '@app/modules/common';
import classnames from '@lib/classnames';
import { ColorsType } from '@lib/tailwind-css/colors';

export interface IColorListBoxOptionProps {
  color: ColorsType;
}

const styles = {
  active: 'opacity-75',
};

const Option: React.FC<IColorListBoxOptionProps> = ({ color }) => (
  <Listbox.Option as="div" value={color}>
    {({ selected, active }) => (
      <ColorCircle
        className={classnames(
          'flex items-center justify-center text-white',
          active && styles.active,
        )}
        color={color}
      >
        {selected || active ? <FontAwesomeIcon icon="check" /> : null}
      </ColorCircle>
    )}
  </Listbox.Option>
);

export default React.memo(Option);
