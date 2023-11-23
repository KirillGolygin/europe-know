import { createAction, createSlice } from "@reduxjs/toolkit";
import { put, call, select } from "redux-saga/effects";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

import { getUsers } from "../api";

import type { IUser } from "../interfaces/user";

interface UsersState {
  currentUser: IUser | null;
  siginFormData: IUser | null;
  signinErrorMessage: string | null;
  registerSuccessed: boolean;
  error: string | null;
}

const initialState: UsersState = {
  currentUser: null,
  siginFormData: null,
  signinErrorMessage: null,
  error: null,
  registerSuccessed: false,
};

export function* signinUserSaga(): any {
  const { users } = yield select();
  yield put(loginUserLoading());
  try {
    const response = yield call(getUsers);
    const { result } = yield response.data;

    const correctUser = result.find(
      (user: IUser) =>
        user.login === users.siginFormData.login &&
        user.password === users.siginFormData.password
    );
    yield put(loginUserSuccess(correctUser));
  } catch (error) {
    yield put(loginUseRejected(`Произошла ошибка: ${error}`));
  }
}

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loginUserLoading: (state) => {
      state.signinErrorMessage = null;
    },
    loginUserSuccess: (state, action: PayloadAction<IUser>) => {
      if (action.payload) {
        state.currentUser = action.payload;
      } else {
        state.signinErrorMessage = "Данный пользователь не зарегестрирован";
      }
    },
    loginUseRejected: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    saveFormData: (state, action: PayloadAction<IUser>) => {
      state.siginFormData = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    toggleRegisterStatus: (state, action: PayloadAction<boolean>) => {
      state.registerSuccessed = action.payload;
    },
  },
});

export const SIGNIN_USER = "users/signinUser";
export const signinUser = createAction(SIGNIN_USER);

export const {
  loginUserLoading,
  loginUserSuccess,
  loginUseRejected,
  saveFormData,
  logoutUser,
  toggleRegisterStatus,
} = usersSlice.actions;

export const selectFilteredCountries = (state: RootState) =>
  state.countries.filteredCountries;

export const selectCurrentUser = (state: RootState) => state.users.currentUser;
export const selectSigninError = (state: RootState) =>
  state.users.signinErrorMessage;
export const selectError = (state: RootState) => state.users.error;
export const selectRegisterSuccessed = (state: RootState) =>
  state.users.registerSuccessed;

export default usersSlice.reducer;
