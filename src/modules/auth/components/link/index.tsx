import { Link, LinkProps } from '@/lib/chakra-ui';

const AuthLink: React.FC<LinkProps> = ({
  color = 'primary.800',
  children,
  fontSize = 'sm',
  fontWeight = 'bold',
  prefetch = false,
  textDecoration = 'underline',
  ...props
}) => {
  return (
    <Link
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      prefetch={prefetch}
      textDecoration={textDecoration}
      {...props}
    >
      {children}
    </Link>
  );
};

export { AuthLink };
