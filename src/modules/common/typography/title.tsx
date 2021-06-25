import React, { useMemo } from 'react';

import classnames from '@lib/classnames';
import { containsTextColor, containsTextSize } from '@lib/tailwind-css/util';

import { HeaderSizeMap, HeaderTagsType } from './types';

interface IProps extends React.ComponentPropsWithRef<any> {
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
  const shouldAddColorClass = useMemo(() => !containsTextColor(className), [className]);
  const shouldAddSizeClass = useMemo(() => !containsTextSize(className), [className]);
  return (
    <Component
      {...props}
      className={classnames(
        className,
        'font-normal leading-normal',
        !noStyled && 'mt-0 mb-2',
        shouldAddColorClass && 'text-blueGray-600',
        shouldAddSizeClass && HeaderSizeMap[tag],
      )}
    >
      {children}
    </Component>
  );
};

export default Title;
