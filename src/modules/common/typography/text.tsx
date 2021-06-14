import { useMemo } from 'react';

import classnames from '@lib/classnames';
import { SizeAlreadyExists } from '@lib/tailwind-css/util';

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
  tag?: TextTags;
  color?: string;
}

const Text: React.FC<IProps> = ({ tag = TextTags.P, className = '', children, ...props }) => {
  const Component = tag;
  const size = useMemo(() => (SizeAlreadyExists(className) ? '' : 'text-base'), [className, tag]);
  return (
    <Component
      {...props}
      className={classnames(className, size, 'leading-relaxed mt-0 mb-4', WeightMap[tag])}
    >
      {children}
    </Component>
  );
};

export default Text;
