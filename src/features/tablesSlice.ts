import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type Data = { x: number; y: number; value: string };

export type ColumnValues = {
  column1: string;
  column2: string;
  column3: string;
  column4: string;
};

type TableItem = {
  id: string;
  data: Data[];
  header: string[];
};

type TablesState = {
  list: TableItem[];
};

const initialState: TablesState = {
  list: [],
};

const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    createTable: (state, action: PayloadAction<ColumnValues>) => {
      const { column1, column2, column3, column4 } = action.payload;

      state.list.push({
        id: uuidv4(),
        header: [column1, column2, column3, column4],
        data: [],
      });
    },

    copyTable: (state, action: PayloadAction<{ id: string }>) => {
      const table = state.list.find((item) => item.id === action.payload.id);

      if (!table) return;

      const clonedTable: TableItem = {
        id: uuidv4(),
        header: [...table.header],
        data: table.data.map((d) => ({ ...d })),
      };

      const index = state.list.findIndex((item) => item.id === action.payload.id);

      state.list.splice(index + 1, 0, clonedTable);
    },

    changeData: (state, action: PayloadAction<{ id: string; data: Data[] }>) => {
      const { id, data } = action.payload;

      const table = state.list.find((item) => item.id === id);

      if (table) {
        table.data = data;
      }
    },

    removeTableById: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },

    moveTable: (state, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
      const { oldIndex, newIndex } = action.payload;

      if (oldIndex < 0 || newIndex < 0 || oldIndex >= state.list.length || newIndex >= state.list.length) {
        return;
      }

      const [movedElement] = state.list.splice(oldIndex, 1);
      state.list.splice(newIndex, 0, movedElement);
    },
  },
});

export const selectTables = (state: { tables: TablesState }) => state.tables.list;
export const { createTable, copyTable, removeTableById, changeData, moveTable } = tablesSlice.actions;
export default tablesSlice.reducer;
