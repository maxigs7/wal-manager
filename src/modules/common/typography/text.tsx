import React, { useMemo } from 'react';

import classnames from '@lib/classnames';
import { containsTextColor, containsTextSize } from '@lib/tailwind-css/util';

import { TextTagsType, TextWeightMap } from './types';

interface IProps extends React.ComponentPropsWithRef<any> {
  noStyled?: boolean;
  tag?: TextTagsType;
}

const Text: React.FC<IProps> = ({
  children,
  className = '',
  noStyled = false,
  tag = 'p',
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
        'leading-relaxed',
        !noStyled && 'mt-0 mb-4',
        shouldAddColorClass && 'text-blueGray-600',
        shouldAddSizeClass && 'text-base',
        TextWeightMap[tag],
      )}
    >
      {children}
    </Component>
  );
};

export default React.memo(Text);
