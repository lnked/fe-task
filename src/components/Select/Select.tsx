import { memo, useCallback } from 'react';

import { Container, SelectBase, Arrow } from './tokens';

type SelectProps = {
  name: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

const SelectComponent = ({ name, value, options, onChange }: SelectProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value);
    },
    [onChange],
  );

  return (
    <Container>
      <Arrow />

      <SelectBase name={name} value={value} onChange={handleChange}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        )) ?? <option value="">No options</option>}
      </SelectBase>
    </Container>
  );
};

export const Select = memo(SelectComponent);
