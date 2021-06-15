import { Category, SubCategory } from '@app/api/categories';

// import { List } from '../list';
import { ListEmpty } from '../list-empty';
import { ListNoSelected } from '../list-no-selected';
import { ListSkeleton } from '../list-skeleton/index';
import { TitleBar } from '../title-bar';

interface IProps extends React.ComponentPropsWithoutRef<'div'> {
  category?: Category;
  isLoading: boolean;
  onCategoryEdit?: () => void;
  onCreate?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  subCategories: SubCategory[];
}

const Panel: React.FC<IProps> = ({
  category,
  className,
  isLoading = true,
  onCategoryEdit,
  // onCreate,
  // onDelete,
  // onEdit,
  subCategories = [],
}) => {
  return (
    <div className={className}>
      {category && <TitleBar category={category} onEdit={onCategoryEdit} />}

      {isLoading && <ListSkeleton />}
      {!isLoading && !category && <ListNoSelected />}
      {!isLoading && category && !subCategories.length && <ListEmpty />}
      {/* {!isLoading && !!subCategories.length && (
        <List categories={subCategories} onCreate={onCreate} onDelete={onDelete} onEdit={onEdit} />
      )} */}
    </div>
  );
};

export { Panel };
