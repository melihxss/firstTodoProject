import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoItems: []
};

const cartDelete = createSlice({
  name: "delete",
  initialState,
  reducers: {
    deleteCart: (state, action) => {
      state.todoItems = action.payload.todos;
    },
    deletedCart: (state, action) => {
      state.todoItems = action.payload;
    },
    editTodos:(state,action)=>{
      state.todoItems = action.payload;
    }
  }
});

export default cartDelete.reducer;
export const { deleteCart, deletedCart,editTodos } = cartDelete.actions;
