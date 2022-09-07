import { Box, Flex, FlexProps, Heading, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import React, { PropsWithChildren, ReactNode } from 'react';

// import { usePagePortals } from '@shared';

interface IProps extends PropsWithChildren {
  metaDescription?: string;
  metaTitle: string;
  title?: string;
}

const PageHeader: React.FC<IProps & Omit<FlexProps, 'bg'>> = ({
  children,
  metaDescription,
  metaTitle,
  title,
  align = 'center',
  gap = '3',
  p = '5',
  ...props
}) => {
  const bg = useColorModeValue('primary.400', 'primary.600');
  return (
    <>
      <Head>
        <title>{metaTitle} - WAL</title>
        {metaDescription && <meta content={metaDescription} name="description" />}
      </Head>
      <Flex align={align} bg={bg} gap={gap} p={p} {...props}>
        {title && (
          <Heading as="h1" color="white">
            {title}
          </Heading>
        )}
        {children}
      </Flex>
    </>
  );
};

export { PageHeader };
