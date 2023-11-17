import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import { takeEvery } from "redux-saga/effects";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

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

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, usersReducer);

export const store = configureStore({
  devTools: true,
  reducer: {
    countries: countriesReducer,
    popups: popupsReducer,
    users: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
