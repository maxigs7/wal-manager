import { Heading } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Category } from '@app/api/categories';
import classnames from '@lib/classnames';

const styles = {
  icon: (color: string) => classnames('rounded-full text-white p-2 mr-1', color),
  title: 'flex-1',
  wrapper: 'p-5 flex border-b border-white',
};
interface IProps {
  category: Category;
  onEdit?: () => void;
}

const TitleBar: React.FC<IProps> = ({ category }) => (
  <div className={styles.wrapper}>
    <Heading as="h5" className={styles.title}>
      <span className={styles.icon(category.color)}>
        <FontAwesomeIcon icon={category.icon} fixedWidth />
      </span>
      {category.name}
    </Heading>
  </div>
);

export { TitleBar };
