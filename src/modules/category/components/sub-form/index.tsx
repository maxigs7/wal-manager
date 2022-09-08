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
import { Category, CategoryType } from '@models';

import { useCategoryIsUnique } from '../../hooks';

interface IProps extends UseFormReturn<Category> {
  id?: string;
  parentId: string;
  type: CategoryType;
}

const SubCategoryForm: React.FC<IProps> = ({
  formState: { errors },
  id,
  parentId,
  register,
  type,
}) => {
  const isUnique = useCategoryIsUnique();

  return (
    <SimpleGrid columns={[1, 2]} gap={6}>
      <FormControl as={GridItem} colSpan={[1, 2]} isInvalid={!!errors.name} isRequired>
        <FormLabel htmlFor="name">{es.category.form.name}</FormLabel>
        <Input
          id="name"
          placeholder={es.category.form.namePlaceholder}
          {...register('name', {
            required: es.common.validation.required,
            validate: (name) => isUnique(type, name, id, parentId),
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
    </SimpleGrid>
  );
};

export { SubCategoryForm };
