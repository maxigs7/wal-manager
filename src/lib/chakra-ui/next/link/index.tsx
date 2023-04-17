import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import type { FC, RefAttributes } from 'react';

import {
  forwardRef,
  chakra,
  HTMLChakraProps,
  ThemingProps,
  useStyleConfig,
  omitThemingProps,
} from '@chakra-ui/react';

const cx = (...classNames: any[]) => classNames.filter(Boolean).join(' ');

type Pretty<T> = { [K in keyof T]: T[K] } & object;
type Merge<P, T> = Pretty<Omit<P, keyof T> & T>;
type LegacyProps = 'as' | 'legacyBehavior' | 'passHref';

type LinkComponent = FC<RefAttributes<HTMLAnchorElement> & LinkProps>;

export type LinkProps = Merge<
  HTMLChakraProps<'a'> & ThemingProps<'Link'>,
  Omit<NextLinkProps, LegacyProps>
>;

export const Link: LinkComponent = forwardRef(function Link(props, ref) {
  const styles = useStyleConfig('Link', props);
  const { className, href, children, ...rest } = omitThemingProps(props);

  return (
    <chakra.a
      href={href as any}
      ref={ref}
      {...rest}
      __css={styles}
      as={NextLink}
      className={cx('chakra-link', className)}
    >
      {children}
    </chakra.a>
  );
});
