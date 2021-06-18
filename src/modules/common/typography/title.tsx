import React from 'react';

import classnames from '@lib/classnames';
import { ColorsType } from '@lib/tailwind-css/colors';
import { containsTextSize } from '@lib/tailwind-css/util';

import { HeaderSizeMap, HeaderTagsType } from './types';

interface IProps extends React.ComponentPropsWithRef<any> {
  color?: ColorsType;
  noStyled?: boolean;
  tag?: HeaderTagsType;
}

const Title: React.FC<IProps> = ({
  children,
  className = '',
  noStyled = false,
  tag = 'h1',
  ...props
}) => {
  const Component = tag;
  return (
    <Component
      {...props}
      className={classnames(
        className,
        'font-normal leading-normal text-blueGray-600',
        !noStyled && 'mt-0 mb-2',
        !containsTextSize(className) && HeaderSizeMap[tag],
      )}
    >
      {children}
    </Component>
  );
};

export default React.memo(Title);
