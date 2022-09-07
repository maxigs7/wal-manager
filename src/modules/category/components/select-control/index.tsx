// import React from 'react';
// import { Control, RegisterOptions, useController } from 'react-hook-form';

// import Select, { ISelectProps } from '../select';

// export interface ISelectControlProps extends Omit<ISelectProps, 'onBlur' | 'onChange' | ''> {
//   control?: Control<any>;
//   rules?: RegisterOptions;
// }

// const SelectControl: React.FC<ISelectControlProps> = ({
//   categories = [],
//   control,
//   id,
//   isLoading,
//   name,
//   placeholder,
//   rules,
// }) => {
//   const { field } = useController({
//     name,
//     control,
//     rules,
//   });

//   return (
//     <Select
//       {...field}
//       categories={categories}
//       id={id}
//       isLoading={isLoading}
//       placeholder={placeholder}
//     />
//   );
// };

// export default SelectControl;
export {};
