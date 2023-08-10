import NextLink from 'next/link';

import { Link, LinkProps } from '@nextui-org/link';

import { classnames } from '@/lib/classnames';

const AuthLink: React.FC<LinkProps> = ({
  children,
  className,
  href,
  underline = 'always',
  ...props
}) => {
  return (
    <Link
      as={NextLink}
      className={classnames('font-bold text-tiny', className)}
      href={href}
      prefetch={false}
      underline={underline}
      {...props}
    >
      {children}
    </Link>
  );
};

export { AuthLink };
