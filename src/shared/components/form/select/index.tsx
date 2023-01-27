import React, { PropsWithChildren } from 'react';

import { Select, SelectProps } from '@chakra-ui/react';

const SelectForm = React.forwardRef<any, SelectProps & PropsWithChildren>(
  ({ children, ...props }, ref) => (
    <Select {...props} ref={ref} variant="flushed">
      {children}
    </Select>
  ),
);

SelectForm.displayName = 'SelectForm';

export { SelectForm };
