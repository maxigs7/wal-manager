import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Icon,
  IconButton,
  Select,
  Td,
  Text,
  Tfoot,
  Tr,
} from '@chakra-ui/react';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

import { es } from '@/i18n';

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
  totalRows: number;
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
  totalRows,
}) => (
  <Tfoot>
    <Tr>
      <Td
        borderTop="solid"
        borderTopColor="gray.300"
        borderTopWidth="thin"
        colSpan={numberOfColumns}
      >
        <Flex align="center" fontSize="xs" gap="2">
          <Box color="gray.400" justifySelf="flex-start">
            {es.common.table.pagination.showing(
              pageSize * pageIndex + 1,
              pageSize * pageIndex + numberOfRows,
              totalRows,
            )}
          </Box>
          <Flex flexBasis="100%" gap="3" justify="center">
            <ButtonGroup colorScheme="accent" size="xs" variant="outline">
              <IconButton
                aria-label="First page"
                icon={<Icon as={ChevronDoubleLeftIcon} />}
                isDisabled={!canPreviousPage}
                onClick={() => setPageIndex(0)}
                rounded="full"
              />
              <IconButton
                aria-label="Previous page"
                icon={<Icon as={ChevronLeftIcon} />}
                isDisabled={!canPreviousPage}
                onClick={() => previousPage()}
                rounded="full"
              />

              {pageIndexes
                .filter((n) => n + pageIndex >= 0 && n + pageIndex < pageCount)
                .map((n) => (
                  <Button
                    key={n}
                    aria-label={`Go to page ${pageIndex + 1 + n}`}
                    isDisabled={n === 0}
                    onClick={() => setPageIndex(pageIndex + n)}
                    rounded="full"
                    variant={n === pageIndex ? 'solid' : undefined}
                  >
                    {pageIndex + n + 1}
                  </Button>
                ))}

              <IconButton
                aria-label="First page"
                icon={<Icon as={ChevronRightIcon} />}
                isDisabled={!canNextPage}
                onClick={() => nextPage()}
                rounded="full"
              />
              <IconButton
                aria-label="Previous page"
                icon={<Icon as={ChevronDoubleRightIcon} />}
                isDisabled={!canNextPage}
                onClick={() => setPageIndex(pageCount - 1)}
                rounded="full"
              />
            </ButtonGroup>

            <Flex align="center" color="gray.400" gap="1">
              <Text>
                {es.common.table.pagination.page}{' '}
                <Text as="strong">
                  {es.common.table.pagination.pageSummary(pageIndex + 1, pageCount)}
                </Text>
              </Text>
            </Flex>
          </Flex>

          <Select
            color="gray.600"
            justifySelf="flex-end"
            maxW="32"
            size="sm"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {pageSizes.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {es.common.table.pagination.rowsByPage(pageSize)}
              </option>
            ))}
          </Select>
        </Flex>
      </Td>
    </Tr>
  </Tfoot>
);
