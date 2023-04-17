import { Heading, HeadingProps } from '@chakra-ui/react';

export const PageTitle: React.FC<HeadingProps> = ({
  as = 'h2',
  children,
  fontSize = 'xl',
  textAlign = 'center',
  mb = '5',
  ...props
}) => (
  <Heading as={as} fontSize={fontSize} mb={mb} textAlign={textAlign} {...props}>
    {children}
  </Heading>
);
