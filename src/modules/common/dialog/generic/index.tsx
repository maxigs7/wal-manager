import * as React from 'react';
import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { Text, Title } from '@app/modules/common';
import classnames from '@lib/classnames';

import DialogOverlay from '../overlay';
import commonStyles from '../styles';
import { DialogGenericProps, DialogSizeMap, DialogSizes, DialogTypes } from '../types';
import { ButtonsAction } from './buttons-action';
import { IconHeader } from './icon-header';

const styles = {
  message: 'text-blueGray-600',
  title: 'mt-14 mb-4 text-center text-blueGray-600',
};

const DialogGeneric: React.FC<DialogGenericProps> = ({
  action,
  actionButtonText,
  cancelButtonText,
  isOpen,
  message = 'Estas seguro?',
  size = DialogSizes.MD,
  title = 'Confirmacion',
  toggle,
  type = DialogTypes.INFO,
}) => (
  <Transition as={Fragment} show={isOpen}>
    <Dialog as="div" className={commonStyles.dialog} onClose={toggle} open={isOpen}>
      <div className="flex items-center justify-center min-h-screen">
        <DialogOverlay />
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-70"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-70"
        >
          <div className={classnames(commonStyles.content, DialogSizeMap[size])}>
            <IconHeader type={type} />

            <Dialog.Title as={Title} className={styles.title} tag="h4">
              {title}
            </Dialog.Title>

            <Dialog.Description as={Text} className={styles.message}>
              {message}
            </Dialog.Description>

            <ButtonsAction
              action={action}
              actionText={actionButtonText}
              cancelText={cancelButtonText}
              toggle={toggle}
              type={type}
            />
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
);

export default React.memo(DialogGeneric);
