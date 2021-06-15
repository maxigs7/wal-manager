import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, ButtonShapes, ButtonSizes, HeaderTags, Title } from '@app/modules/common';

const styles = {
  createButton: 'h-8 w-8',
  title: 'flex-1',
  titleBar: 'p-5 flex border-b items-center',
};

interface IProps {
  onCreate: () => void;
}

const TitleBar: React.FC<IProps> = ({ onCreate }) => (
  <div className={styles.titleBar}>
    <Title className={styles.title} tag={HeaderTags.H5} noStyled>
      Categorias
    </Title>
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
