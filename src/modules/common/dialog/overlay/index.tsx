import React, { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

const styles = {
  overlay: 'fixed inset-0 bg-black bg-opacity-50 transition-opacity',
};

const DialogOverlay: React.FC = () => (
  <Transition.Child
    as={Fragment}
    enter="ease-out duration-500"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="ease-in duration-500"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <Dialog.Overlay className={styles.overlay} />
  </Transition.Child>
);

export default React.memo(DialogOverlay);
