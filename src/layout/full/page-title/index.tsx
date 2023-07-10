import { Heading, HeadingProps } from '@chakra-ui/react';

export const PageTitle: React.FC<HeadingProps> = ({
  children,
  fontSize = 'xl',
  fontWeight = 'bold',
  py = '3',
  textTransform = 'uppercase',
  ...props
}) => {
  return (
    <Heading
      fontSize={fontSize}
      fontWeight={fontWeight}
      py={py}
      textTransform={textTransform}
      {...props}
    >
      {children}
    </Heading>
  );
};
