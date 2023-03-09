'use client';

import { useRouter } from 'next/navigation';
import { ComponentProps, useEffect } from 'react';

import { UseFormHandleSubmit } from 'react-hook-form';

import { es } from '@/i18n';

import { ErrorBox, SuccessBox } from '../../components';
import { useResetPasswordRequest } from '../../hooks';
import { ResetPasswordRequestFormType } from '../../models';

type Props = Omit<ComponentProps<'form'>, 'onSubmit'> & {
  handleSubmit: UseFormHandleSubmit<ResetPasswordRequestFormType>;
};

export const FormContainer: React.FC<Props> = ({ children, handleSubmit }) => {
  const router = useRouter();
  const { isError, isSuccess, mutateAsync } = useResetPasswordRequest();

  const resetPasswordHandler = async (form: ResetPasswordRequestFormType) => {
    try {
      await mutateAsync(form.email);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isSuccess) {
      timeout = setTimeout(() => {
        router.push('/auth/sign-in');
      }, 10000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isSuccess, router]);

  return (
    <form
      className="mx-auto my-5 flex w-full max-w-md flex-col gap-5"
      onSubmit={handleSubmit(resetPasswordHandler)}
    >
      {isError && <ErrorBox>{es.auth.resetPassword.requestError}</ErrorBox>}
      {isSuccess && <SuccessBox>{es.auth.resetPassword.requestSuccess}</SuccessBox>}
      {children}
    </form>
  );
};
