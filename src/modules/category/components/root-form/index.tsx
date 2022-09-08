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
import { ColorSelect, IconSelect } from '@shared';

import { useCategoryIsUnique } from '../../hooks';

interface IProps extends UseFormReturn<Category> {
  id?: string;
  type: CategoryType;
}

const RootCategoryForm: React.FC<IProps> = ({
  control,
  formState: { errors },
  id,
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
          placeholder={es.category.form.name}
          {...register('name', {
            required: es.common.validation.required,
            validate: (name) => isUnique(type, name, id),
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} colSpan={[2, 1]} isInvalid={!!errors.color} isRequired>
        <FormLabel htmlFor="color">{es.category.form.color}</FormLabel>
        <ColorSelect
          control={control}
          id="color"
          name="color"
          placeholder={es.category.form.color}
          rules={{
            required: es.common.validation.required,
          }}
        />
        <FormErrorMessage>{errors.color && errors.color.message}</FormErrorMessage>
      </FormControl>
      <FormControl as={GridItem} colSpan={[2, 1]} isInvalid={!!errors.icon} isRequired>
        <FormLabel htmlFor="icon">{es.category.form.icon}</FormLabel>
        <IconSelect
          control={control}
          id="icon"
          name="icon"
          placeholder={es.category.form.icon}
          rules={{
            required: es.common.validation.required,
          }}
        />
        <FormErrorMessage>{errors.icon && errors.icon.message}</FormErrorMessage>
      </FormControl>
    </SimpleGrid>
  );
};

export { RootCategoryForm };
