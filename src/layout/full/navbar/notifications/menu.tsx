import { MenuGroup, MenuList, Text } from '@chakra-ui/react';

const NotificationsMenuList: React.FC = () => {
  return (
    <MenuList>
      <MenuGroup title="Notifications">
        <Text p="3">No hay notificaciones</Text>
      </MenuGroup>
    </MenuList>
  );
};

export { NotificationsMenuList };
