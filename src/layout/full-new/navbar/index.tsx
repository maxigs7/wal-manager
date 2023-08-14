import 'server-only';

import React from 'react';

import { NavbarContent } from '@nextui-org/navbar';

import { getScopedI18n } from '@/i18n/server';
import { createServerClient } from '@/lib/supabase/create-server-client';
import { getUser } from '@/supabase';

import { NavbarMenuToggle } from './menu-toggle';
import { Navbar } from './navbar';
import { UserMenu } from './user-menu';

const MyNavbar: React.FC = async () => {
  const supabase = createServerClient();
  const user = await getUser(supabase);
  const commonT = await getScopedI18n('common');
  return (
    <Navbar>
      <NavbarContent>
        <NavbarMenuToggle
          closeLabel={commonT('sidebar.close')}
          openLabel={commonT('sidebar.open')}
        />
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <UserMenu imageUrl={user?.user_metadata?.photoURL} userName={user?.email} />
      </NavbarContent>
    </Navbar>
  );
};

export { MyNavbar as Navbar };
