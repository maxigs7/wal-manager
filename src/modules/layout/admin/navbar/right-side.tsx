import 'server-only';

import { createServerClient } from '@/lib/supabase/create-server-client';
import { getUser } from '@/supabase';

import UserMenu from './user';

const RightSide: React.FC = async () => {
  const supabase = createServerClient();
  const user = await getUser(supabase);

  return <UserMenu email={user?.email || ''} />;
};

export default RightSide;
