import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';

import { AccountTypeRadioGroup } from '@app/components';
import { useAppSelector } from '@app/hooks';
import { Account, isUnique } from '@app/models/accounts';
import { AccountType } from '@app/models/common';
import { selectUserId } from '@app/stores/auth';

const Form: React.FC<IProps> = ({ account, control, formState: { errors }, register }) => {
  const userId = useAppSelector(selectUserId);

  return (
    <SimpleGrid columns={2} gap={6}>
      <FormControl as={GridItem} colSpan={2} isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Nombre</FormLabel>
        <Input
          id="name"
          placeholder="Nombre"
          {...register('name', {
            required: 'Este campo es requerido.',
            minLength: { value: 4, message: 'Debe contenter al menos 4 caracteres.' },
            validate: (name) => isUnique(name, userId as string, account?.id),
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.accountType}>
        <FormLabel htmlFor="accountType">Tipo</FormLabel>
        <AccountTypeRadioGroup
          control={control}
          defaultValue={AccountType.Bank}
          id="accountType"
          name="accountType"
        />
        <FormErrorMessage>{errors.accountType && errors.accountType.message}</FormErrorMessage>
      </FormControl>
    </SimpleGrid>
  );
};

interface IProps extends UseFormReturn<Account> {
  account?: Account;
}

export { Form as AccountForm };
