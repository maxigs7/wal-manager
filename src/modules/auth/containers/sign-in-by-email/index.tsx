import Link from 'next/link';

import { useForm, yupResolver } from 'react-hook-form';

import { es } from '@/i18n';
import { routes } from '@/routes';
import { Button } from '@/shared/components';

import { SignInForm } from '../../components';
import { signInFormSchema, SignInFormType } from '../../models';
import { FormContainer } from './form-container';

const SignInByEmail: React.FC = () => {
  const form = useForm<SignInFormType>({
    resolver: yupResolver(signInFormSchema),
  });

  return (
    <FormContainer handleSubmit={form.handleSubmit}>
      <SignInForm {...form} />

      <Link
        className="self-end text-sm font-bold text-blue-gray-800 underline"
        href={routes.auth.resetPassword}
        prefetch={false}
      >
        {es.auth.signIn.resetPasswordLink}
      </Link>

      <Button isLoading={form.formState.isSubmitting} type="submit">
        {es.auth.signIn.action}
      </Button>
    </FormContainer>
  );
};

export { SignInByEmail };
