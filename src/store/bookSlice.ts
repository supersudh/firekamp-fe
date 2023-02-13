import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  books: [],
  isFetchingBooks: false
} as any;

const booksSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    fetchBooks(state) {
      state.isFetchingBooks = true;
    },
    setBooks(state, action: PayloadAction<any>) {
      state.books = action.payload;
      state.isFetchingBooks = false;
    }
  }
});

export const { actions, reducer, name: sliceKey } = booksSlice;