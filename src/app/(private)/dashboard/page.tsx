import { Box, Heading } from '@chakra-ui/react';

import { CurrencySelect } from '@/shared/components';

export const revalidate = 0;

export default function DashboardPage() {
  return (
    <>
      <Box p="3">
        <Heading>Dashboard</Heading>

        <Box bg="white" display="flex" flexDir="column" gap="3" maxW="lg" mt="3" p="5">
          <CurrencySelect id="Currency" name="currency" />
        </Box>
      </Box>
    </>
  );
}
