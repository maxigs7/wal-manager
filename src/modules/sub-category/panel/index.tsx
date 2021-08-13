import { Box, CircularProgress } from '@chakra-ui/react';

import { Category, SubCategory } from '@app/api/categories';

import { SubCategoryList } from '../list';
import { SubCategoryListEmpty } from '../list-empty';
import { SubCategoryListNoSelected } from '../list-no-selected';
import { CategoryBar } from './category-bar';

const SubCategoryPanel: React.FC<IProps> = ({
  category,
  isLoading = true,
  onCategoryEdited,
  // onCreated,
  // onDeleted,
  // onEdited,
  subCategories = [],
}) => {
  const noSelected = !isLoading && !category;
  const isEmpty = !isLoading && category && !subCategories.length;
  return (
    <>
      {category && <CategoryBar category={category} onEdited={onCategoryEdited} />}
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        h="full"
        justifyContent={isLoading ? 'center' : ''}
        minH="xs"
        p={isLoading ? '4' : ''}
        w="full"
      >
        {isLoading && <CircularProgress color="blue.300" isIndeterminate />}
        {noSelected && <SubCategoryListNoSelected />}
        {isEmpty && <SubCategoryListEmpty onCreated={() => console.log('Creating')} />}
        {!isEmpty && <SubCategoryList subCategories={subCategories} />}
      </Box>
    </>
  );
};

interface IProps {
  category?: Category;
  isLoading: boolean;
  onCategoryEdited?(): void;
  onCreated?(): void;
  onDeleted?(): void;
  onEdited?(): void;
  subCategories?: SubCategory[];
}

export { SubCategoryPanel };

// const Panel: React.FC<IProps> = ({
//   category,
//   className,
//   isLoading = true,
//   onCategoryEdit,
//   // onCreate,
//   // onDelete,
//   // onEdit,
//   subCategories = [],
// }) => {
//   return (
//     <div className={className}>
//       {category && <TitleBar category={category} onEdit={onCategoryEdit} />}

//       {isLoading && <ListSkeleton />}
//       {!isLoading && !category && <ListNoSelected />}
//       {!isLoading && category && !subCategories.length && <ListEmpty />}
//       {/* {!isLoading && !!subCategories.length && (
//         <List categories={subCategories} onCreate={onCreate} onDelete={onDelete} onEdit={onEdit} />
//       )} */}
//     </div>
//   );
// };
