import React from 'react';

import classnames from '@lib/classnames';
import { containsTextSize } from '@lib/tailwind-css/util';

export enum HeaderTags {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
}

const SizeMap = {
  [HeaderTags.H1]: 'text-6xl',
  [HeaderTags.H2]: 'text-5xl',
  [HeaderTags.H3]: 'text-4xl',
  [HeaderTags.H4]: 'text-3xl',
  [HeaderTags.H5]: 'text-2xl',
  [HeaderTags.H6]: 'text-1xl',
};

interface IProps extends React.ComponentPropsWithRef<any> {
  tag?: HeaderTags;
  color?: string;
  noStyled?: boolean;
}

const Title: React.FC<IProps> = ({
  children,
  className = '',
  noStyled = false,
  tag = HeaderTags.H1,
  ...props
}) => {
  const Component = tag;
  return (
    <Component
      {...props}
      className={classnames(
        className,
        'font-normal leading-normal',
        !noStyled && 'mt-0 mb-2',
        !containsTextSize(className) && SizeMap[tag],
      )}
    >
      {children}
    </Component>
  );
};

export default React.memo(Title);
