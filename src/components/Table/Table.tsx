import { useCallback, useEffect, useRef, useState } from 'react';

import { Input } from '../Input';
import {
  Container,
  TableBase,
  ActiveCell,
  Title,
  TableHeader,
  Actions,
  Button,
  StyledCopyIcon,
  StyledDeleteIcon,
  VisuallyHidden,
} from './tokens';
import { getKey } from './utils';

type Data = { x: number; y: number; value: string };

export const Table = ({
  data,
  header,
  onChange,
  onDelete,
  onCopy,
  isActionsTextVisible,
  dragHandle,
}: {
  data: Data[];
  header: string[];
  onChange: (data: Data[]) => void;
  onDelete: () => void;
  onCopy: () => void;
  isActionsTextVisible: boolean;
  dragHandle: React.ReactNode;
}) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [gridData, setGridData] = useState<Map<string, string>>(
    new Map(data.map((item) => [getKey(item.x, item.y), item.value])),
  );
  const [activeCell, setActiveCell] = useState<[number, number] | null>(null);

  const handleChange = useCallback(
    (x: number, y: number) => (value: string) => {
      setGridData((prev) => {
        const newData = new Map(prev);
        newData.set(getKey(x, y), value);
        return newData;
      });
    },
    [],
  );

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange(
        Array.from(gridData.entries()).map(([key, value]) => ({
          x: key.split(',').map(Number)[0],
          y: key.split(',').map(Number)[1],
          value,
        })),
      );
    }, 500);
  }, [gridData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <ActiveCell>{activeCell?.join(',')}</ActiveCell>

      <TableBase>
        <thead>
          <tr>
            {header.map((item, index) => (
              <th key={`${item}-${index}`}>
                <TableHeader $isActionsColumn={index === header.length - 1}>
                  {index === 0 && dragHandle}

                  <Title>{item}</Title>

                  {index === header.length - 1 && (
                    <Actions>
                      <Button type="button" onClick={onCopy}>
                        <StyledCopyIcon aria-hidden />
                        {isActionsTextVisible ? <span>Copy</span> : <VisuallyHidden>Copy</VisuallyHidden>}
                      </Button>

                      <Button type="button" onClick={onDelete}>
                        <StyledDeleteIcon aria-hidden />
                        {isActionsTextVisible ? <span>Delete</span> : <VisuallyHidden>Delete</VisuallyHidden>}
                      </Button>
                    </Actions>
                  )}
                </TableHeader>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from(Array(4).keys()).map((x) => (
            <tr key={x}>
              {Array.from(Array(4).keys()).map((y) => (
                <td key={y}>
                  <Input
                    value={gridData.get(getKey(x, y)) || ''}
                    onChange={handleChange(x, y)}
                    onFocus={() => setActiveCell([x, y])}
                    onBlur={() => setActiveCell(null)}
                    placeholder={[x, y].join(',')}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </TableBase>
    </Container>
  );
};
