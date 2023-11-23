import { IUser } from "./../interfaces/user";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { put, call, select } from "redux-saga/effects";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

import { getUsers, regUser } from "../api";

interface UsersState {
  currentUser: IUser | null;
  siginFormData: IUser | null;
  regFormData: IUser | null;
  signinErrorMessage: string | null;
  isAlreadyRegistered: boolean;
  registerSuccessed: boolean;
  error: string | null;
}

const initialState: UsersState = {
  currentUser: null,
  siginFormData: null,
  regFormData: null,
  signinErrorMessage: null,
  error: null,
  registerSuccessed: false,
  isAlreadyRegistered: false,
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

export function* regUserSaga(): any {
  const { users } = yield select();
  const response = yield call(getUsers);
  const { result } = yield response.data;

  const registeredUser = result.find(
    (user: IUser) => user.login === users.regFormData.login
  );

  if (registeredUser) {
    yield put(toggleIsAlreadyRegistered(true));
  } else {
    yield call(regUser, users.regFormData);
    yield put(toggleRegisterStatus(true));
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
    saveSigninFormData: (state, action: PayloadAction<IUser>) => {
      state.siginFormData = action.payload;
    },
    saveRegFormData: (state, action: PayloadAction<IUser>) => {
      state.regFormData = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    toggleRegisterStatus: (state, action: PayloadAction<boolean>) => {
      state.registerSuccessed = action.payload;
    },
    toggleIsAlreadyRegistered: (state, action: PayloadAction<boolean>) => {
      state.isAlreadyRegistered = action.payload;
    },
  },
});

export const SIGNIN_USER = "users/signinUser";
export const signinUser = createAction(SIGNIN_USER);

export const REG_USER = "users/regUser";
export const registerUser = createAction(REG_USER);

export const {
  loginUserLoading,
  loginUserSuccess,
  loginUseRejected,
  saveSigninFormData,
  logoutUser,
  toggleRegisterStatus,
  toggleIsAlreadyRegistered,
  saveRegFormData,
} = usersSlice.actions;

export const selectFilteredCountries = (state: RootState) =>
  state.countries.filteredCountries;

export const selectCurrentUser = (state: RootState) => state.users.currentUser;
export const selectSigninError = (state: RootState) =>
  state.users.signinErrorMessage;
export const selectError = (state: RootState) => state.users.error;
export const selectRegisterSuccessed = (state: RootState) =>
  state.users.registerSuccessed;
export const selectIsAlreadyRegistered = (state: RootState) =>
  state.users.isAlreadyRegistered;

export default usersSlice.reducer;
