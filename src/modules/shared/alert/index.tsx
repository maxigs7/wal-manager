import { PropsWithChildren } from 'react';

import { tv, type VariantProps } from 'tailwind-variants';

import InfoIcon from '@/assets/icons/interface-essential/information-circle.svg';
import SuccessIcon from '@/assets/icons/interface-essential/shield-check.svg';
import ErrorIcon from '@/assets/icons/interface-essential/skull-1.svg';
import WarningIcon from '@/assets/icons/interface-essential/warning-triangle.svg';

const alert = tv({
  slots: {
    container: 'flex items-center p-4 text-sm border-l-4 w-full rounded-md',
    icon: 'w-4 h-4 mr-2',
  },
  variants: {
    status: {
      error: {
        container: 'bg-danger-100 border-danger-400 text-danger-700',
      },
      info: {
        container: 'bg-info-100 border-info-400 text-info-700',
      },
      success: {
        container: 'bg-success-100 border-success-400 text-success-700',
      },
      warning: {
        container: 'bg-warning-100 border-warning-400 text-warning-700',
      },
    },
  },
});

export type AlertProps = PropsWithChildren & VariantProps<typeof alert>;

const Alert: React.FC<AlertProps> = ({ children, ...props }) => {
  const { container, icon } = alert(props);

  return (
    <div className={container()}>
      {props.status === 'error' && <ErrorIcon className={icon()} />}
      {props.status === 'info' && <InfoIcon className={icon()} />}
      {props.status === 'success' && <SuccessIcon className={icon()} />}
      {props.status === 'warning' && <WarningIcon className={icon()} />}
      {children}
    </div>
  );
};

export { Alert };
