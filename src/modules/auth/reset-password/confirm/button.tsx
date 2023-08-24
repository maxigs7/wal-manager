'use client';

import { PropsWithChildren } from 'react';
import React from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { useFormContext } from 'react-hook-form';

import { ResetPasswordConfirmFormType } from '../../models';

const ResetPasswordConfirmButtonSubmit: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    formState: { isSubmitting },
  } = useFormContext<ResetPasswordConfirmFormType>();

  return (
    <LoadingButton
      className="max-w-xs"
      loading={isSubmitting}
      type="submit"
      variant="contained"
      fullWidth
    >
      {children}
    </LoadingButton>
  );
};

export default ResetPasswordConfirmButtonSubmit;
