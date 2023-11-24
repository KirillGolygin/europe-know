import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { takeEvery } from 'redux-saga/effects';

import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore
} from 'redux-persist';

import countriesReducer from './countries-slice';
import {
  GET_COUNTRIES,
  getCountriesSaga,
  GET_COUNTRY_DETAILS,
  getCountryDetailsSaga
} from './countries-slice';

import popupsReducer from './popups-slice';

import usersReducer from './users-slice';
import { SIGNIN_USER, signinUserSaga, regUserSaga, REG_USER } from './users-slice';

const sagaMiddleware = createSagaMiddleware();

function* sagas() {
  yield takeEvery(GET_COUNTRIES, getCountriesSaga);
  yield takeEvery(SIGNIN_USER, signinUserSaga);
  yield takeEvery(REG_USER, regUserSaga);
  yield takeEvery(GET_COUNTRY_DETAILS, getCountryDetailsSaga);
}

const rootReducer = combineReducers({
  countries: countriesReducer,
  popups: popupsReducer,
  users: usersReducer
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      },
      thunk: false
    }).concat(sagaMiddleware)
});

sagaMiddleware.run(sagas);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
