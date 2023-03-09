'use client';

import { useRouter } from 'next/navigation';
import { ComponentProps, useEffect } from 'react';

import { UseFormHandleSubmit } from 'react-hook-form';

import { es } from '@/i18n';
import { routes } from '@/routes';

import { ErrorBox, SuccessBox } from '../../components';
import { useUpdatePassword } from '../../hooks';
import { ResetPasswordConfirmFormType } from '../../models';

type Props = Omit<ComponentProps<'form'>, 'onSubmit'> & {
  handleSubmit: UseFormHandleSubmit<ResetPasswordConfirmFormType>;
};

export const FormContainer: React.FC<Props> = ({ children, handleSubmit }) => {
  const router = useRouter();
  const { isError, isSuccess, mutateAsync } = useUpdatePassword();

  const resetPasswordHandler = async (form: ResetPasswordConfirmFormType) => {
    try {
      await mutateAsync(form.password);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isSuccess) {
      timeout = setTimeout(() => {
        router.push(routes.auth.signIn);
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
      {isError && <ErrorBox>{es.auth.resetPassword.confirmError}</ErrorBox>}
      {isSuccess && <SuccessBox>{es.auth.resetPassword.requestSuccess}</SuccessBox>}
      {children}
    </form>
  );
};
