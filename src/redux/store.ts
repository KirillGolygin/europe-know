import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import { takeEvery } from "redux-saga/effects";

import countriesReducer from "./countries-slice";
import { GET_COUNTRIES, getCountriesSaga } from "./countries-slice";

import popupsReducer from "./popups-slice";

const sagaMiddleware = createSagaMiddleware();

function* sagas() {
  yield takeEvery(GET_COUNTRIES, getCountriesSaga);
}

export const store = configureStore({
  devTools: true,
  reducer: {
    countries: countriesReducer,
    popups: popupsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
