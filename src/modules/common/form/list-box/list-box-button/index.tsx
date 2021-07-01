import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Listbox } from '@headlessui/react';

import classnames from '@lib/classnames';

const styles = {
  arrowIcon: 'absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none',
  arrowsWrapper: 'fa-layers fa-fw',
  button: (disabled: boolean) =>
    classnames(
      'relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-primary-300 focus-visible:ring-offset-2 focus-visible:border-primary-500 sm:text-sm',
      !disabled && 'cursor-default',
      disabled && 'opacity-60 cursor-not-allowed',
    ),
  label: 'block truncate',
};

const ListBoxButton: React.FC<React.ComponentProps<any>> = ({ children, disabled }) => (
  <Listbox.Button className={styles.button(disabled)}>
    <span className={styles.label}>{children}</span>
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

export default React.memo(ListBoxButton);
