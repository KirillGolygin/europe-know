import { createAction, createSlice } from "@reduxjs/toolkit";
import { put, call, select } from "redux-saga/effects";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

import { getUsers } from "../api";

interface IUser {
  login: string;
  password: string;
}

interface UsersState {
  currentUser: IUser | null;
  siginFormData: IUser | null;
  signinErrorMessage: string | null;
  error: string | null;
}

const initialState: UsersState = {
  currentUser: null,
  siginFormData: null,
  signinErrorMessage: null,
  error: null,
};

export function* signinUserSaga(): any {
  const { users } = yield select();
  console.log(users);
  yield put(setCurrentUserLoading());
  try {
    const response = yield call(getUsers);
    const { result } = yield response.data;

    const correctUser = result.find(
      (user: IUser) =>
        user.login === users.siginFormData.login &&
        user.password === users.siginFormData.password
    );
    console.log(correctUser);
    yield put(setCurrentUserSuccess(correctUser));
  } catch (error) {
    yield put(setCurrentUserRejected(`Произошла ошибка: ${error}`));
  }
}

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUserLoading: (state) => {
      state.signinErrorMessage = null;
    },
    setCurrentUserSuccess: (state, action: PayloadAction<IUser>) => {
      if (action.payload) {
        state.currentUser = action.payload;
      } else {
        state.signinErrorMessage = "Данный пользователь не зарегестрирован";
      }
    },
    setCurrentUserRejected: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    saveFormData: (state, action: PayloadAction<IUser>) => {
      state.siginFormData = action.payload;
    },
  },
});

export const SIGNIN_USER = "users/signinUser";
export const signinUser = createAction(SIGNIN_USER);

export const {
  setCurrentUserSuccess,
  setCurrentUserRejected,
  setCurrentUserLoading,
  saveFormData,
} = usersSlice.actions;

export const selectFilteredCountries = (state: RootState) =>
  state.countries.filteredCountries;
export const selectLoading = (state: RootState) => state.countries.loading;
export const selectError = (state: RootState) => state.countries.error;

export default usersSlice.reducer;
