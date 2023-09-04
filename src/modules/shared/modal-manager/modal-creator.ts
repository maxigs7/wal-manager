import { ModalMap } from './types';

export const MODALS: ModalMap = new Map([]);

export const modalCreator = (key: string, component: React.ComponentType<any>) => {
  if (MODALS.has(key)) {
    throw new Error(`Modal with key ${key} already exists`);
  }

  MODALS.set(key, component);
};

export const modalGetter = <TProps>(modals: ModalMap, key: string) => {
  if (!modals.has(key)) {
    throw new Error(`Modal with key ${key} does not exist`);
  }
  return modals.get(key) as React.ComponentType<TProps>;
};
