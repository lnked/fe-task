import { useState } from 'react';

import { InputBase } from './tokens';

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  placeholder?: string;
};

export const Input = ({ value: initialValue, onChange, onFocus, onBlur, placeholder }: InputProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <InputBase
      type="text"
      value={value}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  );
};
