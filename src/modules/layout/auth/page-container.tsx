import 'server-only';

import { PropsWithChildren } from 'react';

import Box from '@mui/material/Box';
import { blueGrey } from '@mui/material/colors';

const PageContainer = ({ children }: PropsWithChildren) => {
  return (
    <Box className="flex min-h-screen items-center justify-center" sx={{ bgcolor: blueGrey[50] }}>
      <Box
        className="shadow-md flex flex-col gap-3 p-3 lg:p-6 w-full lg:max-w-md justify-center items-center text-center"
        component="main"
        sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageContainer;
