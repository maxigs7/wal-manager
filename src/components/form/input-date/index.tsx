import React from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

import { Input } from '@chakra-ui/react';
import { parseISO } from 'date-fns';

const InputDate: React.FC<IProps> = ({ id, name, placeholder, register, rules }) => (
  <Input
    id={id}
    placeholder={placeholder}
    type="date"
    {...register(name, {
      ...rules,
      setValueAs: (v) => parseISO(v),
    })}
  />
);

interface IProps {
  id?: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
}

export { InputDate };
