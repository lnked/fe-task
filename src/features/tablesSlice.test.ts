import { configureStore } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { beforeEach, vi, describe, expect } from 'vitest';

import tablesReducer, {
  createTable,
  copyTable,
  changeData,
  removeTableById,
  moveTable,
  selectTables,
  type Data,
  type ColumnValues,
} from './tablesSlice';

vi.mock('uuid', () => ({
  v4: vi.fn(() => 'mocked-uuid'),
}));

describe('tablesSlice', () => {
  const mockColumnValues: ColumnValues = {
    column1: 'A',
    column2: 'B',
    column3: 'C',
    column4: 'D',
  };

  const mockData: Data[] = [
    { x: 0, y: 0, value: 'cell1' },
    { x: 1, y: 0, value: 'cell2' },
  ];

  beforeEach(() => {
    vi.mocked(uuidv4).mockClear();
  });

  describe('reducers', () => {
    it('should handle initial state', () => {
      const state = tablesReducer(undefined, { type: 'unknown' });
      expect(state).toEqual({ list: [] });
    });

    it('should handle createTable', () => {
      const initialState = { list: [] };
      const action = createTable(mockColumnValues);
      const result = tablesReducer(initialState, action);

      expect(result.list).toHaveLength(1);
      expect(result.list[0]).toEqual({
        id: 'mocked-uuid',
        header: ['A', 'B', 'C', 'D'],
        data: [],
      });
    });

    it('should handle copyTable', () => {
      const originalTable = {
        id: 'original-id',
        header: ['A', 'B', 'C', 'D'],
        data: mockData,
      };
      const initialState = { list: [originalTable] };

      const action = copyTable({ id: 'original-id' });
      const result = tablesReducer(initialState, action);

      expect(result.list).toHaveLength(2);
      expect(result.list[0]).toBe(originalTable); // оригинал не изменился
      expect(result.list[1]).toEqual({
        id: 'mocked-uuid',
        header: ['A', 'B', 'C', 'D'],
        data: mockData.map((d) => ({ ...d })), // глубокая копия
      });
    });

    it('should not copyTable if id not found', () => {
      const initialState = { list: [] };
      const action = copyTable({ id: 'non-existent' });
      const result = tablesReducer(initialState, action);
      expect(result.list).toHaveLength(0);
    });

    it('should handle changeData', () => {
      const table = {
        id: 'table-id',
        header: ['A', 'B', 'C', 'D'],
        data: [],
      };
      const initialState = { list: [table] };

      const newData: Data[] = [{ x: 0, y: 0, value: 'updated' }];
      const action = changeData({ id: 'table-id', data: newData });
      const result = tablesReducer(initialState, action);

      expect(result.list[0].data).toBe(newData); // ссылка заменена
    });

    it('should not changeData if id not found', () => {
      const initialState = { list: [] };
      const action = changeData({ id: 'non-existent', data: mockData });
      const result = tablesReducer(initialState, action);
      expect(result.list).toHaveLength(0);
    });

    it('should handle removeTableById', () => {
      const table1 = { id: 'id1', header: [], data: [] };
      const table2 = { id: 'id2', header: [], data: [] };
      const initialState = { list: [table1, table2] };

      const action = removeTableById('id1');
      const result = tablesReducer(initialState, action);

      expect(result.list).toEqual([table2]);
    });

    it('should handle moveTable', () => {
      const tables = [
        { id: '1', header: [], data: [] },
        { id: '2', header: [], data: [] },
        { id: '3', header: [], data: [] },
      ];
      const initialState = { list: tables };

      const action = moveTable({ oldIndex: 0, newIndex: 2 });
      const result = tablesReducer(initialState, action);

      expect(result.list).toEqual([tables[1], tables[2], tables[0]]);
    });

    it('should not moveTable if indices are out of bounds', () => {
      const tables = [{ id: '1', header: [], data: [] }];
      const initialState = { list: tables };

      const action = moveTable({ oldIndex: 0, newIndex: 5 });
      const result = tablesReducer(initialState, action);

      expect(result.list).toEqual(tables); // без изменений
    });
  });

  describe('selectors', () => {
    it('selectTables should return tables list', () => {
      const state = {
        tables: {
          list: [{ id: '1', header: [], data: [] }],
        },
      };

      const result = selectTables(state);
      expect(result).toEqual(state.tables.list);
    });
  });

  describe('integration with store', () => {
    it('should work in a real Redux store', () => {
      const store = configureStore({ reducer: { tables: tablesReducer } });

      store.dispatch(createTable(mockColumnValues));
      expect(selectTables(store.getState())).toHaveLength(1);

      const firstTableId = selectTables(store.getState())[0].id;
      store.dispatch(changeData({ id: firstTableId, data: mockData }));
      expect(selectTables(store.getState())[0].data).toEqual(mockData);

      store.dispatch(copyTable({ id: firstTableId }));
      expect(selectTables(store.getState())).toHaveLength(2);
    });
  });
});
