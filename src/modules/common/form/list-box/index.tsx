import React from 'react';

import { Listbox, Transition } from '@headlessui/react';

import ListBoxButton from './list-box-button';
import ListBoxOption from './list-box-option';

export interface ListBoxOption {
  label: React.ReactNode;
  value: any;
  disabled?: boolean;
}

interface IProps {
  disabled?: boolean;
  onChange: React.Dispatch<React.SetStateAction<any>>;
  open?: boolean;
  options: ListBoxOption[];
  selected: any;
  selectedLabel: React.ReactNode;
}

const ListBox: React.FC<IProps> = ({ disabled, onChange, options, selected, selectedLabel }) => (
  <Listbox disabled={disabled} onChange={onChange} value={selected}>
    <div className="relative">
      <ListBoxButton disabled={disabled}>{selectedLabel}</ListBoxButton>
      <Transition
        as={React.Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {options.map((option, idx) => (
            <ListBoxOption isDisabled={option.disabled} key={idx} value={option.value}>
              {option.label}
            </ListBoxOption>
          ))}
        </Listbox.Options>
      </Transition>
    </div>
  </Listbox>
);

export default React.memo(ListBox);
