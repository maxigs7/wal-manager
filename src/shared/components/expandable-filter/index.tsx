import React, { useCallback } from 'react';

import { Box, Collapse, Flex, IconButton, Input, BoxProps } from '@chakra-ui/react';

import { useTextFilter } from '@shared';

import Icon from '../icon';

interface IProps extends BoxProps {
  actions?: React.ReactNode;
  mainBar?: React.ReactNode;
  onChangedText?(text: string): void;
  text?: string;
}

const ExpandableFilter: React.FC<IProps> = ({
  actions,
  children,
  mainBar,
  onChangedText,
  text,
  ...props
}) => {
  const [{ isOpen }, { onToggle }] = useTextFilter();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangedText && onChangedText(e.target.value);
    },
    [onChangedText],
  );

  return (
    <Box borderBottom="1px" borderBottomColor="gray.300" p="3" {...props}>
      <Flex alignItems={[null, 'center']} flexDirection={['column-reverse', 'row']}>
        {children && (
          <IconButton
            aria-label="expand filters"
            icon={<Icon icon={isOpen ? 'angle-double-up' : 'angle-double-down'} />}
            mr={[null, '3']}
            onClick={() => onToggle()}
          />
        )}
        {mainBar && <Box mb={['3', '0']}>{mainBar}</Box>}
        {!mainBar && (
          <Input
            maxW="md"
            mb={['3', '0']}
            onChange={onChange}
            placeholder="Buscar..."
            value={text}
          />
        )}
        {!mainBar && actions && (
          <Box mb={['3', '0']} ml={['0', 'auto']}>
            {actions}
          </Box>
        )}
      </Flex>
      {children && <Collapse in={isOpen}>{children}</Collapse>}
    </Box>
  );
};

export default ExpandableFilter;
