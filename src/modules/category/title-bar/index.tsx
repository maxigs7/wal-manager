import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, ButtonShapes, ButtonSizes } from '@app/modules/common';

const styles = {
  createButton: '',
  title: 'text-2xl flex-1',
  titleBar: 'p-5 flex border-b',
};

interface IProps {
  onCreate: () => void;
}

const TitleBar: React.FC<IProps> = ({ onCreate }) => (
  <div className={styles.titleBar}>
    <h2 className={styles.title}>Categorias</h2>
    <Button
      className={styles.createButton}
      onClick={() => onCreate()}
      shape={ButtonShapes.CIRCLE}
      size={ButtonSizes.SMALL}
    >
      <FontAwesomeIcon icon="plus" fixedWidth />
    </Button>
  </div>
);

export { TitleBar };
