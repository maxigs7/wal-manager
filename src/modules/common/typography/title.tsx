import { useMemo } from 'react';

import classnames from '@lib/classnames';
import { SizeAlreadyExists } from '@lib/tailwind-css/util';

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
  tag = HeaderTags.H1,
  className = '',
  children,
  noStyled = false,
  ...props
}) => {
  const Component = tag;
  const size = useMemo(() => (SizeAlreadyExists(className) ? '' : SizeMap[tag]), [className, tag]);

  return (
    <Component
      {...props}
      className={classnames(
        className,
        'font-normal leading-normal',
        !noStyled && 'mt-0 mb-2',
        size,
      )}
    >
      {children}
    </Component>
  );
};

export default Title;
