import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';

import { es } from '@i18n';
import { CategoryInsert } from '@models';
import { ControlledInput } from '@shared';

import { useCategoryIsUnique } from '../../hooks';

interface IProps extends UseFormReturn<CategoryInsert> {
  id?: string;
  parentId: string;
}

const SubCategoryForm: React.FC<IProps> = ({ control, formState: { errors }, id, parentId }) => {
  const isUnique = useCategoryIsUnique();

  return (
    <SimpleGrid columns={[1, 2]} gap={6}>
      <FormControl as={GridItem} colSpan={[1, 2]} isInvalid={!!errors.name} isRequired>
        <FormLabel htmlFor="name">{es.category.form.name}</FormLabel>
        <ControlledInput
          control={control}
          id="name"
          name="name"
          placeholder={es.category.form.namePlaceholder}
          rules={{
            required: es.common.validation.required,
            validate: (name) => isUnique(name || '', id, parentId),
          }}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
    </SimpleGrid>
  );
};

export { SubCategoryForm };
