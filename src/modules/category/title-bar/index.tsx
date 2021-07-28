import { Button, Heading } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    <Heading as="h5" className={styles.title}>
      Categorias
    </Heading>
    <Button className={styles.createButton} onClick={() => onCreate()} shape="circle" size="sm">
      <FontAwesomeIcon icon="plus" fixedWidth />
    </Button>
  </div>
);

export { TitleBar };
