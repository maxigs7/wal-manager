import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Select,
  Td,
  Tfoot,
  Tr,
} from '@chakra-ui/react';

import { Icon } from '../icon';
import { pageSizes, pageIndexes } from './util';

interface IProps {
  canNextPage: boolean;
  canPreviousPage: boolean;
  nextPage(): void;
  numberOfColumns: number;
  numberOfRows: number;
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  previousPage(): void;
  setPageIndex(index: number): void;
  setPageSize(noPages: number): void;
}

export const Paginator: React.FC<IProps> = ({
  canNextPage,
  canPreviousPage,
  nextPage,
  numberOfColumns,
  numberOfRows,
  pageCount,
  pageIndex,
  pageSize,
  previousPage,
  setPageIndex,
  setPageSize,
}) => (
  <Tfoot>
    <Tr>
      <Td
        borderTop="solid"
        borderTopColor="gray.300"
        borderTopWidth="thin"
        colSpan={numberOfColumns}
      >
        <Flex align="center" gap="2">
          <Box justifySelf="flex-start">{numberOfRows} Rows</Box>
          <Flex flexBasis="100%" gap="3" justify="center">
            <ButtonGroup variant="outline" isAttached>
              <IconButton
                aria-label="First page"
                disabled={!canPreviousPage}
                icon={<Icon icon="angle-double-left" />}
                onClick={() => setPageIndex(0)}
              />
              <IconButton
                aria-label="Previous page"
                disabled={!canPreviousPage}
                icon={<Icon icon="angle-left" />}
                onClick={() => previousPage()}
              />

              {pageIndexes
                .filter((n) => n + pageIndex >= 0 && n + pageIndex < pageCount)
                .map((n) => (
                  <Button
                    key={n}
                    aria-label={`Go to page ${pageIndex + 1 + n}`}
                    disabled={n === 0}
                    onClick={() => setPageIndex(pageIndex + n)}
                  >
                    {pageIndex + n + 1}{' '}
                  </Button>
                ))}

              <IconButton
                aria-label="First page"
                disabled={!canNextPage}
                icon={<Icon icon="angle-right" />}
                onClick={() => nextPage()}
              />
              <IconButton
                aria-label="Previous page"
                disabled={!canNextPage}
                icon={<Icon icon="angle-double-right" />}
                onClick={() => setPageIndex(pageCount - 1)}
              />
            </ButtonGroup>

            <Flex align="center" gap="1">
              <div>Page</div>
              <strong>
                {pageIndex + 1} of {pageCount}
              </strong>
            </Flex>
          </Flex>

          <Select
            justifySelf="flex-end"
            maxW="32"
            value={pageSize}
            variant="flushed"
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {pageSizes.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>
      </Td>
    </Tr>
  </Tfoot>
);
