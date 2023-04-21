import { Box, Heading, Icon } from '@chakra-ui/react';

import { es } from '@/i18n';
import { WalletLogo } from '@/shared/assets';

const AppName: React.FC = () => (
  <Heading
    alignItems="center"
    as="h1"
    display="flex"
    justifyContent="center"
    py="6"
    textTransform="uppercase"
  >
    <Icon as={WalletLogo} boxSize="12" />
    <Box as="span" fontSize="4xl" ml="3">
      {es.common.appName}
    </Box>
  </Heading>
);

export { AppName };
