import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilter: (state, action) => {
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
