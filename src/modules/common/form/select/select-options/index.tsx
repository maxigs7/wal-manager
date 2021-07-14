import React from 'react';

import { Listbox, Transition } from '@headlessui/react';

import { fadeTransition } from '@lib/tailwind-css';

const SelectOptions: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Transition as={React.Fragment} {...fadeTransition(300)}>
    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      {children}
    </Listbox.Options>
  </Transition>
);

export default React.memo(SelectOptions);
