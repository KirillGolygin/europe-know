import { createAction, createSlice } from "@reduxjs/toolkit";
import { put, call, select } from "redux-saga/effects";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

import { getUsers } from "../api";

import type { ICountry } from "./countries-slice";

export interface IUser {
  _id: string;
  login: string;
  password: string;
  favourits: ICountry[];
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
  yield put(setCurrentUserLoading());
  try {
    const response = yield call(getUsers);
    const { result } = yield response.data;

    const correctUser = result.find(
      (user: IUser) =>
        user.login === users.siginFormData.login &&
        user.password === users.siginFormData.password
    );
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
    logoutUser: (state) => {
      state.currentUser = null;
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
  logoutUser,
} = usersSlice.actions;

export const selectFilteredCountries = (state: RootState) =>
  state.countries.filteredCountries;

export const selectCurrentUser = (state: RootState) => state.users.currentUser;
export const selectSigninError = (state: RootState) =>
  state.users.signinErrorMessage;
export const selectError = (state: RootState) => state.users.error;

export default usersSlice.reducer;
