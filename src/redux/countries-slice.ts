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
  flags: {
    svg: string;
    png: string;
    alt: string;
  };
}

interface CountriesState {
  countries: Country[];
  filteredCountries: Country[];
  loading: boolean;
  error: string | null;
}

const initialState: CountriesState = {
  countries: [],
  filteredCountries: [],
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
      state.filteredCountries = action.payload;
      state.countries = action.payload;
    },
    sortCountries: (state, action: PayloadAction<string>) => {
      state.filteredCountries = state.countries.filter((country) => {
        if (!action.payload) {
          return country.name.common.toLowerCase().includes("");
        } else {
          return country.name.common
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        }
      });
    },
  },
});

export const GET_COUNTRIES = "countries/getCountries";
export const getCountries = createAction(GET_COUNTRIES);

export const {
  getCountriesSuccess,
  getCountriesPending,
  getCountriesRejected,
  sortCountries,
} = CountriesSlice.actions;

export const selectFilteredCountries = (state: RootState) =>
  state.countries.filteredCountries;
export const selectLoading = (state: RootState) => state.countries.loading;
export const selectError = (state: RootState) => state.countries.error;

export default CountriesSlice.reducer;
