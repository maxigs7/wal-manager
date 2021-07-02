import React, { Fragment } from 'react';

import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Listbox, Transition } from '@headlessui/react';

import classnames from '@lib/classnames';
import { CategoryIconsName } from '@lib/font-awesome';
import { fadeTransition } from '@lib/tailwind-css';

import Button from './button';
import Option from './option';

interface IProps {
  className?: string;
  disabled?: boolean;
  onChange: React.Dispatch<React.SetStateAction<any>>;
  selected?: IconName;
}

const styles = {
  options: classnames(
    'absolute w-64 p-2 mt-1 overflow-auto transition-opacity opacity-0 duration-500',
    'bg-white rounded-md shadow-lg max-h-60',
    'ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
    'flex flex-wrap items-center gap-2',
  ),
};

const IconListBox: React.FC<IProps> = ({ className, disabled = false, onChange, selected }) => (
  <Listbox disabled={disabled} onChange={onChange} value={selected}>
    <div className={classnames('relative', className)}>
      <Button disabled={disabled} icon={selected} />
      <Transition as={Fragment} {...fadeTransition(300)}>
        <Listbox.Options as="div" className={styles.options}>
          {CategoryIconsName.map((icon) => (
            <Option icon={icon} key={icon} />
          ))}
        </Listbox.Options>
      </Transition>
    </div>
  </Listbox>
);

export default React.memo(IconListBox);
