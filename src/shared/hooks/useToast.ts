import {
  CloseAllToastsOptions,
  ToastId,
  useToast as useChakraToast,
  UseToastOptions,
} from '@chakra-ui/react';

interface IChakraToast {
  (options?: UseToastOptions | undefined): string | number | undefined;
  close: (id: ToastId) => void;
  closeAll: (options?: CloseAllToastsOptions | undefined) => void;
  update(
    id: ToastId,
    options: Pick<
      UseToastOptions,
      | 'position'
      | 'onCloseComplete'
      | 'duration'
      | 'title'
      | 'status'
      | 'render'
      | 'description'
      | 'isClosable'
      | 'variant'
    >,
  ): void;
  isActive: (id: ToastId) => boolean | undefined;
}

interface IToast {
  toast: IChakraToast;
  error(options?: UseToastOptions): string | number | undefined;
  info(options?: UseToastOptions): string | number | undefined;
  success(options?: UseToastOptions): string | number | undefined;
  warning(options?: UseToastOptions): string | number | undefined;
}
const hook = (): IToast => {
  const toast = useChakraToast({
    duration: 3000,
    isClosable: true,
    position: 'top-right',
    variant: 'left-accent',
  });

  return {
    toast: toast,
    error: (options?: UseToastOptions | undefined) => toast({ ...options, status: 'error' }),
    info: (options?: UseToastOptions | undefined) => toast({ ...options, status: 'info' }),
    success: (options?: UseToastOptions | undefined) => toast({ ...options, status: 'success' }),
    warning: (options?: UseToastOptions | undefined) => toast({ ...options, status: 'warning' }),
  };
};

export default hook;
