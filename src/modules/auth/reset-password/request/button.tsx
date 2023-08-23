'use client';

import { PropsWithChildren } from 'react';
import React from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { useFormContext } from 'react-hook-form';

import { ResetPasswordRequestFormType } from '../../models';

const ResetPasswordRequestButtonSubmit: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    formState: { isSubmitting },
  } = useFormContext<ResetPasswordRequestFormType>();

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

export default ResetPasswordRequestButtonSubmit;
