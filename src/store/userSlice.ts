import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Book {
  id: number;
  bookId: string;
  title: string;
  author: string;
  genre: string;
  image: string;
}

interface CurrentUser {
  id: number;
  fullName: string;
  email: string;
  books?: [Book];
}

interface UserState {
  currentUser: CurrentUser | undefined;
  isFetchingCurrentUser: boolean;
};

const initialState = {
  currentUser: undefined,
  isFetchingCurrentUser: true,
} as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    watchAuth() { },
    onPerformRegister() { },
    onPerformLogin() { },
    setCurrentUser(state, action: PayloadAction<CurrentUser | undefined>) {
      state.currentUser = action.payload;
      state.isFetchingCurrentUser = false;
    },
    logout(state) {
      state.currentUser = undefined;
    }
  }
});

export const { actions, reducer, name: sliceKey } = userSlice;