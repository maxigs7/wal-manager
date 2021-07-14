import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Listbox } from '@headlessui/react';

import classnames from '@lib/classnames';

export interface IListBoxOptionProps {
  children: React.ReactNode;
  isDisabled?: boolean;
  showCheck?: boolean;
  value: any;
}

const styles = {
  option: (active: boolean, disabled: boolean, showCheck: boolean) =>
    classnames(
      'select-none relative py-2',
      showCheck ? 'pl-10 pr-4' : 'px-4',
      active && 'text-primary-900 bg-primary-100',
      !active && 'text-gray-900',
      !disabled && 'cursor-default',
      disabled && 'opacity-60 cursor-not-allowed',
    ),
  label: (selected: boolean) =>
    classnames('block truncate', selected && 'font-medium', !selected && 'font-normal'),
  labelSelected: 'absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600',
};

const ListBoxOption: React.FC<IListBoxOptionProps> = ({
  children,
  isDisabled = false,
  showCheck = true,
  value,
}) => (
  <Listbox.Option
    className={({ active }) => styles.option(active, isDisabled, showCheck)}
    disabled={isDisabled}
    value={value}
  >
    {({ selected }) => (
      <>
        <span className={styles.label(selected)}>{children}</span>
        {selected && showCheck ? (
          <span className={styles.labelSelected}>
            <FontAwesomeIcon icon="check" />
          </span>
        ) : null}
      </>
    )}
  </Listbox.Option>
);

export default React.memo(ListBoxOption);
