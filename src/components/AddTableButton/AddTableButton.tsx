import { useCallback, useEffect, useRef, useState } from 'react';

import { Button, Container, Menu, MenuItem, AddButton, MenuInput, MenuSelect } from './tokens';

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
    list: ['Country', 'City', 'Street', 'Home'],
    onChange: () => console.log('Удалить'),
  },
];

export const AddTableButton = ({ onCreateTable }: { onCreateTable: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleChange = (value: string) => {
    console.log(value);
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
              <MenuSelect
                value={item.label}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e.target.value)}
              >
                {item.list.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </MenuSelect>
            ) : (
              <MenuInput
                placeholder={item.label}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
              />
            )}
          </MenuItem>
        ))}

        <AddButton onClick={onCreateTable}>Add</AddButton>
      </Menu>
    </Container>
  );
};
