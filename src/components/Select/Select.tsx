import { Container, SelectBase, Arrow } from './tokens';

export const Select = ({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <Container>
      <Arrow />

      <SelectBase name={name} value={value} onChange={handleChange}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </SelectBase>
    </Container>
  );
};
