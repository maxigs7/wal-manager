'use client';

import { useRouter } from 'next/navigation';
import { ComponentProps, useEffect, useMemo } from 'react';

import { FormProvider, useForm, yupResolver } from 'react-hook-form';

import { useScopedI18n } from '@/i18n/client';
import { Button } from '@/lib/@nextui-org/button';
import { Alert } from '@/m/shared/alert';
import { routes } from '@/routes';

import { resetPasswordConfirmFormSchema, ResetPasswordConfirmFormType } from '../../models';
import { useUpdatePassword } from '../../query';

type Props = ComponentProps<'form'> & {
  translations: Record<'confirmError' | 'confirmAction' | 'confirmSuccess', string>;
};

const ResetPasswordConfirmManager: React.FC<Props> = ({ children, translations }) => {
  const t = useScopedI18n('common');
  const resolver = useMemo(() => yupResolver(resetPasswordConfirmFormSchema(t)), [t]);
  const form = useForm<ResetPasswordConfirmFormType>({
    resolver,
  });
  const { handleSubmit } = form;
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
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-3 mx-auto my-5 w-full items-center"
        onSubmit={handleSubmit(resetPasswordHandler)}
      >
        {isError && <Alert status="error">{translations.confirmError}</Alert>}
        {isSuccess && <Alert status="success">{translations.confirmSuccess}</Alert>}

        {children}
        <Button
          className="uppercase max-w-xs font-bold"
          color="accent"
          isLoading={form.formState.isSubmitting}
          type="submit"
          fullWidth
        >
          {translations.confirmAction}
        </Button>
      </form>
    </FormProvider>
  );
};

export { ResetPasswordConfirmManager };
