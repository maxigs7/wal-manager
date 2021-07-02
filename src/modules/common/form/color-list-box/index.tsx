import React, { Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';

import classnames from '@lib/classnames';
import { ColorsMap, ColorsType, fadeTransition } from '@lib/tailwind-css';

import Button from './button';
import Option from './option';

interface IProps {
  className?: string;
  disabled?: boolean;
  onChange: React.Dispatch<React.SetStateAction<any>>;
  selected?: ColorsType;
}

const colors = Object.entries(ColorsMap)
  .filter(([key]) => key !== 'white' && key !== 'transparent')
  .map(([, value]) => value);

const styles = {
  options: classnames(
    'absolute w-64 p-2 mt-1 overflow-auto transition-opacity opacity-0 duration-500',
    'bg-white rounded-md shadow-lg max-h-60',
    'ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
    'flex flex-wrap items-center gap-2',
  ),
};

const ColorListBox: React.FC<IProps> = ({ className, disabled = false, onChange, selected }) => (
  <Listbox disabled={disabled} onChange={onChange} value={selected}>
    <div className={classnames('relative', className)}>
      <Button color={selected} disabled={disabled} />
      <Transition as={Fragment} {...fadeTransition(300)}>
        <Listbox.Options as="div" className={styles.options}>
          {colors.map((color) => (
            <Option color={color} key={color} />
          ))}
        </Listbox.Options>
      </Transition>
    </div>
  </Listbox>
);

export default React.memo(ColorListBox);
