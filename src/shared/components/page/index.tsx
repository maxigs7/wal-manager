import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import React, { PropsWithChildren } from 'react';

// import { usePagePortals } from '@shared';

interface IProps extends PropsWithChildren {
  metaDescription?: string;
  metaTitle: string;
  title?: string;
}

const Title: React.FC<{ title: string }> = ({ title }) => (
  <Heading as="h1" color="white" mb={3}>
    {title}
  </Heading>
);

const Page: React.FC<IProps> = ({ children, metaDescription, metaTitle, title }) => {
  const bg = useColorModeValue('primary.400', 'primary.600');
  return (
    <>
      <Head>
        <title>{metaTitle} - WAL</title>
        {metaDescription && <meta content={metaDescription} name="description" />}
      </Head>
      <Box h="full" w="full">
        <Box bg={bg} p="5">
          {title && <Title title={title} />}
        </Box>

        <Box>{children}</Box>
      </Box>
    </>
  );
};

export { Page };
