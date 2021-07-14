import React from 'react';

import { Listbox } from '@headlessui/react';

import SelectButton from './select-button';
import SelectOption from './select-option';
import SelectOptions from './select-options';

interface IProps {
  disabled?: boolean;
  onChange: React.Dispatch<React.SetStateAction<any>>;
  selected: any;
}

const Select: React.FC<IProps> = React.memo(({ children, disabled, onChange, selected }) => (
  <Listbox disabled={disabled} onChange={onChange} value={selected}>
    <div className="relative">{children}</div>
  </Listbox>
));

export { Select, SelectButton, SelectOption, SelectOptions };
