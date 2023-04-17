import { Button } from '@chakra-ui/react';
import { useForm, yupResolver } from 'react-hook-form';

import { es } from '@/i18n';
import { routes } from '@/routes';

import { AuthLink, SignInForm } from '../../components';
import { signInFormSchema, SignInFormType } from '../../models';
import { FormContainer } from './form-container';

const SignInByEmail: React.FC = () => {
  const form = useForm<SignInFormType>({
    resolver: yupResolver(signInFormSchema),
  });

  return (
    <FormContainer handleSubmit={form.handleSubmit}>
      <SignInForm {...form} />

      <AuthLink href={routes.auth.resetPassword}>{es.auth.signIn.resetPasswordLink}</AuthLink>

      <Button
        colorScheme="accent"
        isLoading={form.formState.isSubmitting}
        maxW="sm"
        type="submit"
        w="full"
      >
        {es.auth.signIn.action}
      </Button>
    </FormContainer>
  );
};

export { SignInByEmail };
