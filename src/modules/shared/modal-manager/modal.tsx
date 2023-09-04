'use client';

import CloseIcon from '@mui/icons-material/Close';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

import { ModalOptions } from './types';

type Props = { options?: ModalOptions } & DialogProps;

const ModalContainer: React.FC<Props> = ({ children, options, ...dialogProps }) => {
  return (
    <Dialog
      fullScreen={options?.fullScreen}
      maxWidth={options?.size || 'sm'}
      fullWidth
      {...dialogProps}
    >
      <DialogTitle>{options?.title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={(e) => dialogProps.onClose?.(e, 'escapeKeyDown')}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export { ModalContainer };
