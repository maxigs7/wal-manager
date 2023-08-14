'use client';
import { useRouter } from 'next/navigation';

import { Avatar } from '@nextui-org/avatar';
import { Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from '@nextui-org/dropdown';

import { useScopedI18n } from '@/i18n/client';
import { useSignOut } from '@/m/auth/query';
import { routes } from '@/routes';

type Props = {
  imageUrl?: string;
  userName?: string;
};

const UserMenu: React.FC<Props> = ({ userName, imageUrl }) => {
  const t = useScopedI18n('common.navbar');
  const tMenu = useScopedI18n('menu.navbar');
  const router = useRouter();
  const { mutateAsync } = useSignOut();

  const signOutHandler = async () => {
    await mutateAsync();
    router.push(routes.auth.signIn);
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          as="button"
          className="transition-transform"
          color="secondary"
          name={userName}
          size="sm"
          src={imageUrl}
          isBordered
        />
      </DropdownTrigger>
      <DropdownMenu aria-label={t('user.label')} variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">{t('user.signedInAs')}</p>
          <p className="font-semibold">{userName}</p>
        </DropdownItem>
        <DropdownItem key="settings">{tMenu('user.settings')}</DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={signOutHandler}>
          {tMenu('user.signOut')}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export { UserMenu };
