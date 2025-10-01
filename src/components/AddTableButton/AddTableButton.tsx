import { useCallback, useEffect, useRef, useState } from 'react';

import { TableForm } from './TableForm';
import { columnFields } from './helpers';
import { Button, Container, Menu } from './tokens';
import type { ColumnValues } from '../../features/tablesSlice';

export const AddTableButton = ({ onCreateTable }: { onCreateTable: (columnValues: ColumnValues) => void }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isOpen, setIsOpen] = useState(false);

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

  const handleSubmit = useCallback(
    (values: ColumnValues) => {
      onCreateTable(values);
      closeMenu();
    },
    [onCreateTable, closeMenu],
  );

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
        <TableForm fields={columnFields} onSubmit={handleSubmit} />
      </Menu>
    </Container>
  );
};
