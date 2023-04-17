import { Button } from '@chakra-ui/react';
import { useForm, yupResolver } from 'react-hook-form';

import { es } from '@/i18n';

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

      <Button
        colorScheme="accent"
        isLoading={form.formState.isSubmitting}
        maxW="sm"
        type="submit"
        w="full"
      >
        {es.auth.signUp.action}
      </Button>
    </FormContainer>
  );
};

export { SignUpByEmail };
