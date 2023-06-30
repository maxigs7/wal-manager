import { Heading, Icon } from '@chakra-ui/react';

import { LogoIcon } from '@/m/shared/icons';

const AppName: React.FC = () => (
  <Heading
    alignItems="center"
    as="h1"
    display="flex"
    justifyContent="center"
    py="6"
    textTransform="uppercase"
  >
    <Icon as={LogoIcon} boxSize="24" color="white" fill="primary.400" />
  </Heading>
);

export { AppName };
