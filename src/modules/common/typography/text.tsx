import React from 'react';

import classnames from '@lib/classnames';
import { containsTextSize } from '@lib/tailwind-css/util';

import { TextTagsType, TextWeightMap } from './types';

interface IProps extends React.ComponentPropsWithRef<any> {
  noStyled?: boolean;
  tag?: TextTagsType;
}

const Text: React.FC<IProps> = ({
  children,
  className = '',
  noStyled: noStyles = false,
  tag = 'p',
  ...props
}) => {
  const Component = tag;

  return (
    <Component
      {...props}
      className={classnames(
        className,
        !containsTextSize(className) && 'text-base',
        'leading-relaxed',
        !noStyles && 'mt-0 mb-4',
        TextWeightMap[tag],
      )}
    >
      {children}
    </Component>
  );
};

export default React.memo(Text);
