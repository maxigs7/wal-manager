import { forwardRef } from 'react';

import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import { Icon } from '../../icon';

const CustomInput = forwardRef<any, any>((props, ref) => {
  return (
    <InputGroup variant="flushed">
      <Input {...props} ref={ref} />
      <InputRightElement
        // eslint-disable-next-line react/no-children-prop
        children={<Icon icon="calendar-alt" />}
        pointerEvents="none"
        userSelect="none"
      />
    </InputGroup>
  );
});

CustomInput.displayName = 'DateInput';

export { CustomInput };
