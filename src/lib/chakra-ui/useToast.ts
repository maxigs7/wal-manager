import { CreateToastFnReturn, useToast as useChakraToast, UseToastOptions } from '@chakra-ui/react';

interface IToast {
  toast: CreateToastFnReturn;
  error(options?: UseToastOptions): string | number | undefined;
  info(options?: UseToastOptions): string | number | undefined;
  success(options?: UseToastOptions): string | number | undefined;
  warning(options?: UseToastOptions): string | number | undefined;
}

export const useToast = (): IToast => {
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
