import 'server-only';

import Box from '@mui/material/Box';

import { createServerClient } from '@/lib/supabase/create-server-client';
import { getUser } from '@/supabase';

import UserMenu from './user';

const RightSide: React.FC = async () => {
  const supabase = createServerClient();
  const user = await getUser(supabase);

  return (
    <Box ml="auto">
      <UserMenu email={user?.email || ''} />
    </Box>
  );
};

export default RightSide;
