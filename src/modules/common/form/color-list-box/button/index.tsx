import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Listbox } from '@headlessui/react';

import { ColorCircle } from '@app/modules/common';
import classnames from '@lib/classnames';
import { ColorsType } from '@lib/tailwind-css/colors';

interface IProps extends React.ComponentProps<'button'> {
  color?: ColorsType;
}

const styles = {
  arrowIcon: 'absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none',
  arrowsWrapper: 'fa-layers fa-fw',
  button: (disabled: boolean) =>
    classnames(
      'relative w-full py-2 pl-3 pr-10 bg-white rounded-lg shadow-md sm:text-sm flex items-center',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white',
      'focus-visible:ring-offset-primary-300 focus-visible:ring-offset-2 focus-visible:border-primary-500',
      !disabled && 'cursor-default',
      disabled && 'opacity-60 cursor-not-allowed',
    ),
  label: 'block truncate',
};

const Button: React.FC<IProps> = ({ color, disabled = false }) => (
  <Listbox.Button className={styles.button(disabled)}>
    {color && <ColorCircle color={color} />}
    <span className={styles.arrowIcon}>
      <span className={styles.arrowsWrapper}>
        <FontAwesomeIcon className="text-gray-400" icon="chevron-up" transform="shrink-5 up-5" />
        <FontAwesomeIcon
          className="text-gray-400"
          icon="chevron-down"
          transform="shrink-5 down-5"
        />
      </span>
    </span>
  </Listbox.Button>
);

export default React.memo(Button);
