import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import { takeEvery } from "redux-saga/effects";

import countriesReducer from "./countries-slice";
import { GET_COUNTRIES, getCountriesSaga } from "./countries-slice";

import popupsReducer from "./popups-slice";

import usersReducer from "./users-slice";
import { SIGNIN_USER, signinUserSaga } from "./users-slice";

const sagaMiddleware = createSagaMiddleware();

function* sagas() {
  yield takeEvery(GET_COUNTRIES, getCountriesSaga);
  yield takeEvery(SIGNIN_USER, signinUserSaga);
}

export const store = configureStore({
  devTools: true,
  reducer: {
    countries: countriesReducer,
    popups: popupsReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
