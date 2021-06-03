import React from 'react';

import classnames from 'classnames';

type AvatarSize = 'lg' | 'md' | 'sm';

export interface AvatarProps extends React.ComponentPropsWithoutRef<'img'> {
  size: AvatarSize;
}

const Avatar: React.FC<AvatarProps> = ({ size = 'md', className, ...htmlAttributes }) => {
  return (
    <img
      className={classnames(
        'inline object-cover rounded-full',
        size !== 'sm' && 'mr-2',
        size === 'sm' && 'w-8 h-8',
        size === 'md' && 'w-12 h-12',
        size === 'lg' && 'w-16 h-16',
        className,
      )}
      {...htmlAttributes}
    />
  );
};

export default Avatar;
