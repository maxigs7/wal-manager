import { Heading, HeadingProps } from '@chakra-ui/react';

export const revalidate = 0;

export const Title: React.FC<HeadingProps> = ({
  children,
  borderBottomColor = 'gray.100',
  borderBottomWidth = '1px',
  fontSize = 'xl',
  fontWeight = 'bold',
  mx = '-3',
  pb = '3',
  px = '3',
  textTransform = 'uppercase',
  ...props
}) => {
  return (
    <Heading
      borderBottomColor={borderBottomColor}
      borderBottomWidth={borderBottomWidth}
      fontSize={fontSize}
      fontWeight={fontWeight}
      mx={mx}
      pb={pb}
      px={px}
      textTransform={textTransform}
      {...props}
    >
      {children}
    </Heading>
  );
};
