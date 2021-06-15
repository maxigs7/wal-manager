import React from 'react';

import classnames from '@lib/classnames';
import { containsTextSize } from '@lib/tailwind-css/util';

export enum TextTags {
  P = 'p',
  SPAN = 'span',
  STRONG = 'strong',
}

const WeightMap = {
  [TextTags.P]: 'font-light',
  [TextTags.SPAN]: 'font-light',
  [TextTags.STRONG]: 'font-bold',
};

interface IProps extends React.ComponentPropsWithRef<any> {
  color?: string;
  noStyled?: boolean;
  tag?: TextTags;
}

const Text: React.FC<IProps> = ({
  children,
  className = '',
  noStyled: noStyles = false,
  tag = TextTags.P,
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
        WeightMap[tag],
      )}
    >
      {children}
    </Component>
  );
};

export default React.memo(Text);
