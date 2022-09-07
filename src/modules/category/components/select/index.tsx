// import React, { useMemo } from 'react';

// import { Select as ReactSelect } from '@lib';
// import { CategoryLookup } from '@models';

// import Tag from '../tag';

// type SelectOption = { label: string; value: string } & CategoryLookup;

// export interface ISelectProps {
//   categories?: CategoryLookup[];
//   id?: string;
//   isClearable?: boolean;
//   isLoading?: boolean;
//   isSearchable?: boolean;
//   name: string;
//   onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
//   onChange?(value?: string): void;
//   placeholder?: string;
//   value?: string;
// }

// const Option: React.FC<SelectOption> = ({ color, icon, subName, rootName }) => (
//   <Tag color={color} icon={icon} name={rootName} subName={subName} />
// );

// const Select = React.forwardRef<any, ISelectProps>(
//   (
//     {
//       categories = [],
//       id,
//       isClearable = false,
//       isLoading = false,
//       isSearchable = true,
//       name,
//       onBlur,
//       onChange,
//       placeholder,
//       value,
//     },
//     ref,
//   ) => {
//     const options = useMemo(
//       () =>
//         categories?.map((category: CategoryLookup) => ({
//           ...category,
//           label: `${category.rootName} ${category.subName}`,
//           value: category.id,
//         })),
//       [categories],
//     );

//     return (
//       <ReactSelect
//         formatOptionLabel={Option}
//         getOptionValue={(option) => option.value}
//         id={id}
//         isClearable={isClearable}
//         isLoading={isLoading}
//         isSearchable={isSearchable}
//         menuPlacement="auto"
//         menuPortalTarget={document.body}
//         name={name}
//         onBlur={onBlur}
//         onChange={(selected) => onChange && onChange(selected?.value)}
//         options={options}
//         placeholder={placeholder}
//         ref={ref}
//         styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
//         value={options?.find((option) => option.value === value)}
//       />
//     );
//   },
// );

// export default Select;
export {};
