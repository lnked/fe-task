import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type Data = { x: number; y: number; value: string };

type TableItem = {
  id: string;
  header: string[];
  data: Data[];
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
    createTable: (state) => {
      state.list.push({ id: uuidv4(), header: ['Name', 'Surname', 'Age', 'City'], data: [] as Data[] });
    },
    copyTable: (state, action: PayloadAction<{ id: string }>) => {
      const currentIndex = state.list.findIndex((item) => item.id === action.payload.id);
      const table = state.list[currentIndex];

      state.list.splice(currentIndex + 1, 0, { id: uuidv4(), header: table?.header || [], data: table?.data || [] });
    },
    changeData: (state, action: PayloadAction<{ id: string; data: Data[] }>) => {
      state.list = state.list.map((item) =>
        item.id === action.payload.id ? { ...item, data: action.payload.data } : item,
      );
    },
    removeTableById: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    moveTable: (state, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
      const [movedElement] = state.list.splice(action.payload.oldIndex, 1);

      state.list.splice(action.payload.newIndex, 0, movedElement);
    },
  },
});

export const selectTables = (state: { tables: TablesState }) => state.tables.list;
export const { createTable, copyTable, removeTableById, changeData, moveTable } = tablesSlice.actions;
export default tablesSlice.reducer;
