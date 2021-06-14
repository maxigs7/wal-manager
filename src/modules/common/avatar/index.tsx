import React from 'react';

import DefaultProfileImg from '@app/assets/images/default-profile.png';
import classnames from '@lib/classnames';

import ImageWithFallback from '../image-with-fallback';

export enum AvatarSizes {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

const SizesMap: { [key in AvatarSizes | string]: string } = {
  [AvatarSizes.SM]: 'w-8 h-8',
  [AvatarSizes.MD]: 'mr-2w-12 h-12',
  [AvatarSizes.LG]: 'mr-2 w-16 h-16',
};

const styles = {
  image: (size: string) => classnames('inline object-cover rounded-full', SizesMap[size]),
};

export interface AvatarProps extends React.ComponentPropsWithoutRef<'img'> {
  size?: AvatarSizes;
}

const Avatar: React.FC<AvatarProps> = ({ size = AvatarSizes.MD, className, ...htmlAttributes }) => {
  return (
    <ImageWithFallback
      className={classnames(styles.image(size), className)}
      fallbackSrc={DefaultProfileImg}
      {...htmlAttributes}
    />
  );
};

export default Avatar;
