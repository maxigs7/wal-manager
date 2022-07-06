import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Box, Heading } from '@chakra-ui/react';

import { usePagePortals } from '@shared';

interface IProps {
  metaDescription?: string;
  metaTitle: string;
  title?: string;
}

const Title: React.FC<{ title: string }> = React.memo(({ title }) => (
  <Heading as="h1" color="white" mb={3}>
    {title}
  </Heading>
));

const Page: React.FC<IProps> = ({ children, metaDescription, metaTitle, title }) => {
  const { titleBoxRef } = usePagePortals();
  return (
    <>
      <Helmet>
        <title>{metaTitle} - WAL</title>
        {metaDescription && <meta content={metaDescription} name="description" />}
      </Helmet>
      <Box h="full" w="full">
        <Box
          bg="primary.600"
          mb={3}
          pb="32"
          pt="8"
          px={{ base: 4, sm: 6, lg: 8 }}
          ref={titleBoxRef}
        >
          {title && <Title title={title} />}
        </Box>

        <Box mt="-32" mx={{ base: 4, sm: 6, lg: 8 }}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Page;
