import * as React from 'react';
import { Fragment, ReactNode, Suspense } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';

import { Title } from '@app/modules/common';
import classnames from '@lib/classnames';

import DialogOverlay from '../overlay';
import commonStyles from '../styles';
import {
  DialogBase,
  DialogSizeMap,
  DialogSizes,
  // DialogTypes,
  DialogWithCancelAction,
  DialogWithPrimaryAction,
} from '../types';
// import { ButtonsAction } from './buttons-action';

const styles = {
  content: 'bg-white rounded mx-1 md:mx-auto z-20 relative p-8 w-full',
  message: 'text-blueGray-600',
  overlay: 'fixed inset-0 bg-black bg-opacity-50 transition-opacity',
  title: 'border-b text-blueGray-600',
};

type DialogFormProps = DialogBase &
  DialogWithCancelAction &
  DialogWithPrimaryAction & {
    children: ReactNode;
  };

const DialogForm: React.FC<DialogFormProps> = ({
  // action,
  // actionButtonText,
  // cancelButtonText,
  isOpen,
  size = DialogSizes.MD,
  title,
  toggle,
  // type = DialogTypes.INFO,
  children,
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
            <Dialog.Title as={Title} className={styles.title} tag="h4">
              {title}
              <a href="#" onClick={() => toggle(false)}>
                <FontAwesomeIcon icon="times" />
              </a>
            </Dialog.Title>

            <Dialog.Description as="div">
              <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
            </Dialog.Description>

            {/* <ButtonsAction
              action={action}
              actionText={actionButtonText}
              cancelText={cancelButtonText}
              toggle={toggle}
              type={type}
            /> */}
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
);

export default React.memo(DialogForm);
