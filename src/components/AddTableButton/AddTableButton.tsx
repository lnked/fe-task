import { useCallback, useEffect, useRef, useState } from 'react';

import type { ColumnValues } from '../../features/tablesSlice';
import { Button, Container, Menu, MenuItem, AddButton, MenuInput } from './tokens';
import { Select } from '../Select';

const select = ['Country', 'City', 'Street', 'Home'];

const columns = [
  {
    id: 'column1',
    label: 'First column',
    onClick: () => console.log('Копировать'),
  },
  {
    id: 'column2',
    label: 'Second column',
    onClick: () => console.log('Редактировать'),
  },
  {
    id: 'column3',
    label: 'Third column',
    onClick: () => console.log('Удалить'),
  },
  {
    id: 'column4',
    list: select,
    onChange: () => console.log('Удалить'),
  },
];

export const AddTableButton = ({ onCreateTable }: { onCreateTable: (columnValues: ColumnValues) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [columnValues, setColumnValues] = useState({
    column1: '',
    column2: '',
    column3: '',
    column4: select[0],
  });
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  const handleChange = (value: string, id: string) => {
    setColumnValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleCreateTable = () => {
    onCreateTable(columnValues);

    setColumnValues({
      column1: '',
      column2: '',
      column3: '',
      column4: select[0],
    });

    closeMenu();
  };

  return (
    <Container>
      <Button
        type="button"
        ref={buttonRef}
        onClick={handleToggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'context-menu' : undefined}
      >
        Create Table
      </Button>

      <Menu ref={menuRef} id="context-menu" role="menu" $isOpen={isOpen} aria-labelledby={buttonRef.current?.id}>
        {columns.map((item) => (
          <MenuItem key={item.id}>
            {item.list ? (
              <Select
                value={columnValues[item.id as keyof typeof columnValues]}
                onChange={(value) => handleChange(value, item.id)}
                options={item.list}
              />
            ) : (
              <MenuInput
                placeholder={item.label}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, item.id)}
              />
            )}
          </MenuItem>
        ))}

        <AddButton onClick={handleCreateTable}>Add</AddButton>
      </Menu>
    </Container>
  );
};
