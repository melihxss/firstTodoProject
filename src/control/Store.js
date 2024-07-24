import { configureStore } from '@reduxjs/toolkit';
import checkSlice from './checkSlice';
import cartDelete from './cartDelete';

export const store = configureStore({
  reducer: {
    check: checkSlice,
    delete:cartDelete
  },
});

