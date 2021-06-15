import { Category } from '@app/api/categories';
import { CategoryType } from '@app/api/common';

import { List } from '../list';
import { ListEmpty } from '../list-empty';
import { ListSkeleton } from '../list-skeleton/index';
import { TitleBar } from '../title-bar';
import { TypesButtons } from '../types-buttons';

interface IProps {
  categories: Category[];
  categorySelected?: Category;
  categoryTypeSelected: CategoryType;
  isLoading: boolean;
  onCategorySelected: (category: Category) => void;
  onCategoryTypeSelected: (type: CategoryType) => void;
  onCreate: () => void;
}

const styles = {
  panel: 'border-r',
};

const Panel: React.FC<IProps> = ({
  categories = [],
  categorySelected,
  categoryTypeSelected,
  isLoading = true,
  onCategorySelected,
  onCategoryTypeSelected,
  onCreate,
}) => {
  return (
    <div className={styles.panel}>
      <TitleBar onCreate={onCreate} />
      <TypesButtons onSelected={onCategoryTypeSelected} selectedType={categoryTypeSelected} />

      {isLoading && <ListSkeleton />}
      {!isLoading && !categories.length && <ListEmpty />}
      {!isLoading && !!categories.length && (
        <List
          categories={categories}
          onSelected={onCategorySelected}
          selectedCategory={categorySelected}
        />
      )}
    </div>
  );
};

export { Panel };
