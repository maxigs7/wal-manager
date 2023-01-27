import { PropsWithChildren } from 'react';

export type PropsWithChildrenAndClass = PropsWithChildren & {
  className?: string;
};
