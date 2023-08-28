// src/form-component/FormInputText.tsx
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

type TextFieldControlProps = {
  name: string;
  control: any;
  label: string;
  type?: HTMLInputElement['type'];
};

const TextFieldControl: React.FC<TextFieldControlProps> = ({ name, control, label, type }) => {
  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          error={!!error}
          helperText={error ? error.message : null}
          label={label}
          onChange={onChange}
          size="small"
          type={type}
          value={value}
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};

export default TextFieldControl;
