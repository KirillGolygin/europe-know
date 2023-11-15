import { createAction, createSlice } from "@reduxjs/toolkit";
import { put, call } from "redux-saga/effects";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

import { getAllCountries } from "../api";

interface Country {
  name: {
    common: string;
    oficial: string;
  };
  capital: string[];
}

interface CountriesState {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

const initialState: CountriesState = {
  countries: [],
  loading: false,
  error: null,
};

export function* getCountriesSaga(): any {
  try {
    yield put(getCountriesPending());
    const response = yield call(getAllCountries);

    const payload = response.data;
    yield put(getCountriesSuccess(payload));
  } catch (error) {
    yield put(getCountriesRejected(`Произошла ошибка: ${error}`));
  }
}

export const CountriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    getCountriesPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCountriesRejected: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCountriesSuccess: (state, action: PayloadAction<Country[]>) => {
      state.loading = false;
      state.error = null;
      state.countries = action.payload;
    },
  },
});

export const GET_COUNTRIES = "countries/getCountries";
export const getCountries = createAction(GET_COUNTRIES);

export const {
  getCountriesSuccess,
  getCountriesPending,
  getCountriesRejected,
} = CountriesSlice.actions;

export const selectCountries = (state: RootState) => state.countries.countries;
export const selectLoading = (state: RootState) => state.countries.loading;
export const selectError = (state: RootState) => state.countries.error;

export default CountriesSlice.reducer;
