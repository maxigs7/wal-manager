import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Category } from '@app/api/categories';
import { Title } from '@app/modules/common';
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
    <Title className={styles.title} tag="h5" noStyled>
      <span className={styles.icon(category.color)}>
        <FontAwesomeIcon icon={category.icon} fixedWidth />
      </span>
      {category.name}
    </Title>
  </div>
);

export { TitleBar };
