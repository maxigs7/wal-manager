import { Flex, Heading } from '@chakra-ui/react';

const Page = () => {
  return (
    <Flex p="2">
      <Heading as="h1" textTransform="uppercase">
        Here will be all shared components
      </Heading>

      <Heading as="h2" textTransform="uppercase"></Heading>
    </Flex>
  );
};

export default Page;
