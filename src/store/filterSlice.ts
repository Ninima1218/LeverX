import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterState = Record<string, string>;

const initialState: FilterState = {};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ key: string; value: string }>) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    clearFilter: () => {
      return {};
    }
  }
});

export const { setFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
