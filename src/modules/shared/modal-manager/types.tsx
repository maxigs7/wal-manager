import { DialogProps } from '@mui/material/Dialog';

export type ModalOptions = {
  closeOnBackdropClick?: boolean;
  fullScreen?: DialogProps['fullScreen'];
  size?: DialogProps['maxWidth'];
  title: string;
};

export type CurrentModalType = {
  Component: React.ComponentType<any>;
  options: ModalOptions;
  props?: any;
};

export type ModalMap = Map<string, React.ComponentType<any>>;

export type ModalManagerProps = {
  isOpen: boolean;
  onOpen<TProps>(key: string, options: ModalOptions, props?: TProps): void;
  onClose(): void;
};
