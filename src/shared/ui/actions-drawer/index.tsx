import React from 'react';

import {
  Button,
  ButtonProps,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { IconName } from '@fortawesome/fontawesome-svg-core';

import Icon from '../icon';

export interface IActionDrawer extends Pick<ButtonProps, 'colorScheme'> {
  icon: IconName;
  label: string;
  onClick: () => void;
}

interface IProps {
  actions: IActionDrawer[];
  isOpen: boolean;
  onClose(): void;
  title?: string;
}

const ActionsDrawer: React.FC<IProps> = React.memo(({ actions, isOpen, onClose, title }) => {
  const onClickHandler = (action: IActionDrawer) => {
    onClose();
    action.onClick();
  };
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
      <DrawerOverlay />
      <DrawerContent>
        {title && <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>}
        <DrawerBody p="0">
          {actions.map((a, ix) => (
            <Button
              aria-label={a.label}
              colorScheme={a.colorScheme}
              key={ix}
              leftIcon={<Icon icon={a.icon} fixedWidth />}
              onClick={() => onClickHandler(a)}
              rounded="none"
              w="full"
            >
              {a.label}
            </Button>
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
});

export default React.memo(ActionsDrawer);
