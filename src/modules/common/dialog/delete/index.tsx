import React from 'react';

import DialogGeneric from '../generic';
import { DialogGenericProps } from '../types';

type Props = Omit<DialogGenericProps, 'actionButtonText' | 'cancelButtonText' | 'type' | 'size'>;

const DialogDelete: React.FC<Props> = (props) => (
  <DialogGeneric
    {...props}
    actionButtonText="Eliminar"
    cancelButtonText="Cancelar"
    size="xs"
    type="danger"
  />
);

export default DialogDelete;
