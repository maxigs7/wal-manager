import { Heading, HeadingProps } from '@chakra-ui/react';

export const Title: React.FC<HeadingProps> = ({
  children,
  borderBottomColor = 'gray.100',
  borderBottomWidth = '1px',
  fontSize = 'xl',
  fontWeight = 'bold',
  p = '3',
  textTransform = 'uppercase',
  ...props
}) => {
  return (
    <Heading
      borderBottomColor={borderBottomColor}
      borderBottomWidth={borderBottomWidth}
      fontSize={fontSize}
      fontWeight={fontWeight}
      p={p}
      textTransform={textTransform}
      {...props}
    >
      {children}
    </Heading>
  );
};
