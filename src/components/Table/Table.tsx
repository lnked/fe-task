import { useState } from 'react';
import { Input } from '../Input';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  flex: 1 1 calc(33.333% - 10.6666666667px); // 16-(16/3) = 10.6666666667px
  min-width: 0;
`;

const TableBase = styled.table`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 0;
  border-spacing: 0;
  border-collapse: collapse;

  th {
    width: 25%;
    padding: 8px 6px;
    text-align: left;
    font-weight: 400;
    font-size: 1.2rem;
    background-color: #0a508b;
    color: #ffffff50;
    border-color: #0a508b;
  }

  td {
    padding: 0;
    border: 1px solid #dbd7d7;
  }
`;

const ActiveCell = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  color: #0a508b;
`;

export const Table = () => {
  const [gridData, setGridData] = useState<Map<string, string>>(new Map());
  const [activeCell, setActiveCell] = useState<[number, number] | null>(null);

  const handleChange = (index: number, key: string) => (value: string) => {
    setGridData(new Map(gridData.set(key, value)));
  };

  return (
    <Container>
      <ActiveCell>{activeCell?.join(',')}</ActiveCell>

      <TableBase>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>City</th>
            <th>Copy</th>
          </tr>
        </thead>

        <tbody>
          {Array.from(Array(4).keys()).map((key) => (
            <tr key={key}>
              <td>
                <Input
                  value={gridData.get('name') || ''}
                  onChange={handleChange(key, 'name')}
                  onFocus={() => setActiveCell([key, 0])}
                  onBlur={() => setActiveCell(null)}
                />
              </td>
              <td>
                <Input
                  value={gridData.get('surname') || ''}
                  onChange={handleChange(key, 'surname')}
                  onFocus={() => setActiveCell([key, 1])}
                  onBlur={() => setActiveCell(null)}
                />
              </td>
              <td>
                <Input
                  value={gridData.get('age') || ''}
                  onChange={handleChange(key, 'age')}
                  onFocus={() => setActiveCell([key, 2])}
                  onBlur={() => setActiveCell(null)}
                />
              </td>
              <td colSpan={2}>
                <Input
                  value={gridData.get('city') || ''}
                  onChange={handleChange(key, 'city')}
                  onFocus={() => setActiveCell([key, 3])}
                  onBlur={() => setActiveCell(null)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </TableBase>
    </Container>
  );
};
