import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkedItems: {}
};

const checkSlice = createSlice({
  name: 'check',
  initialState,
  reducers: {
    checkedTodo: (state, action) => {
      const { id, checked } = action.payload;
      state.checkedItems[id] = checked;
    },
    clearCheckedItems: (state, action) => {
      const idsToRemove = action.payload;
      idsToRemove.forEach(id => {
        delete state.checkedItems[id];
      });
    }
  }
});

export const { checkedTodo, clearCheckedItems } = checkSlice.actions;
export default checkSlice.reducer;
