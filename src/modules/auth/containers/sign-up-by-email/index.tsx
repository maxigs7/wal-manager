import { useForm, yupResolver } from 'react-hook-form';

import { es } from '@/i18n';
import { Button } from '@/shared/components';

import { SignUpForm } from '../../components';
import { signUpFormSchema, SignUpFormType } from '../../models';
import { FormContainer } from './form-container';

const SignUpByEmail: React.FC = () => {
  const form = useForm<SignUpFormType>({
    resolver: yupResolver(signUpFormSchema),
  });

  return (
    <FormContainer handleSubmit={form.handleSubmit}>
      <SignUpForm {...form} />

      <Button isLoading={form.formState.isSubmitting} type="submit">
        {es.auth.signUp.action}
      </Button>
    </FormContainer>
  );
};

export { SignUpByEmail };
