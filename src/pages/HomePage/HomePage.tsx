import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TableContainer, Content, Header, Row, DragHandle } from './tokens';
import { dragHandleImage } from '../../assets';
import { AddTableButton } from '../../components/AddTableButton';
import { Table } from '../../components/Table';
import {
  createTable,
  copyTable,
  changeData,
  moveTable,
  removeTableById,
  selectTables,
  type Data,
} from '../../features/tablesSlice';

const SortableTable = ({
  id,
  data,
  header,
  isActionsTextVisible,
  onCopy,
  onChange,
  onDelete,
}: {
  id: string;
  data: Data[];
  header: string[];
  isActionsTextVisible: boolean;
  onCopy: () => void;
  onChange: (data: Data[]) => void;
  onDelete: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...(isDragging ? { opacity: 0.9 } : {}),
  };

  return (
    <TableContainer ref={setNodeRef} style={style} {...attributes}>
      <Table
        data={data}
        header={header}
        onCopy={onCopy}
        onChange={onChange}
        onDelete={onDelete}
        isActionsTextVisible={isActionsTextVisible}
        dragHandle={
          <DragHandle {...listeners} $isDragging={isDragging}>
            <img src={dragHandleImage} alt="Drag handle" />
          </DragHandle>
        }
      />
    </TableContainer>
  );
};

export const HomePage = () => {
  const dispatch = useDispatch();

  const tables = useSelector(selectTables);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const activeId = String(active.id);
        const overId = String(over.id);
        const oldIndex = tables.findIndex((item) => item.id === activeId);
        const newIndex = tables.findIndex((item) => item.id === overId);

        dispatch(moveTable({ oldIndex, newIndex }));
      }
    },
    [tables, dispatch],
  );

  return (
    <div>
      <Header>
        <Row>
          <AddTableButton onCreateTable={(columnValues) => dispatch(createTable(columnValues))} />
        </Row>
      </Header>

      <Content>
        <Row style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={tables.map((item) => item.id)} strategy={verticalListSortingStrategy}>
              {tables.map((table, index) => (
                <SortableTable
                  key={table.id}
                  id={table.id}
                  data={table.data}
                  header={table.header}
                  onCopy={() => dispatch(copyTable({ id: table.id }))}
                  onChange={(data) => dispatch(changeData({ id: table.id, data }))}
                  onDelete={() => dispatch(removeTableById(table.id))}
                  isActionsTextVisible={(index + 1 === tables.length && (index + 1) % 3 === 1) || tables.length < 2}
                />
              ))}
            </SortableContext>
          </DndContext>
        </Row>
      </Content>
    </div>
  );
};
