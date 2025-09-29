import { useState } from 'react';
import styled from 'styled-components';

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
};

const InputBase = styled.input`
  width: 100%;
  height: 100%;
  border: 0;
  padding: 8px 6px;
  border-radius: 0;
  background-color: #fff;

  &:focus {
    outline: none;
  }
`;

export const Input = ({ value: initialValue, onChange, onFocus, onBlur }: InputProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return <InputBase type="text" onChange={handleChange} value={value} onFocus={onFocus} onBlur={onBlur} />;
};
