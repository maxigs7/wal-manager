import React from 'react';
import { Helmet } from 'react-helmet';

import { Box, Heading } from '@chakra-ui/react';

const Page: React.FC<IProps> = ({ children, metaDescription, metaTitle, title }) => (
  <>
    <Helmet>
      <title>{metaTitle} - WAL</title>
      {metaDescription && <meta content={metaDescription} name="description" />}
    </Helmet>
    <Box h="full" w="full">
      <Heading as="h1" mb={3}>
        {title}
      </Heading>
      {children}
    </Box>
  </>
);

interface IProps {
  metaDescription?: string;
  metaTitle: string;
  title: string;
}

export default Page;
