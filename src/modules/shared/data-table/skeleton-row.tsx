import { Skeleton, Td, Tr } from '@chakra-ui/react';

type Props = {
  numberOfColumns: number;
  numberOfRows?: number;
};

const SkeletonRow: React.FC<Props> = ({ numberOfColumns, numberOfRows = 1 }) => (
  <>
    {[...new Array(numberOfRows)].map((v, i) => (
      <Tr key={i}>
        {[...new Array(numberOfColumns)].map((v, j) => (
          <Td key={j}>
            <Skeleton height="20px"></Skeleton>
          </Td>
        ))}
      </Tr>
    ))}
  </>
);

export default SkeletonRow;
