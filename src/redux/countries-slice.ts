import { createAction, createSlice } from "@reduxjs/toolkit";
import { put, call } from "redux-saga/effects";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

import { getAllCountries } from "../api";

export interface ICountry {
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
  favourite: boolean;
}

interface CountriesState {
  countries: ICountry[];
  favourits: ICountry[];
  filteredCountries: ICountry[];
  loading: boolean;
  error: string | null;
}

const initialState: CountriesState = {
  countries: [],
  favourits: [],
  filteredCountries: [],
  loading: false,
  error: null,
};

export function* getCountriesSaga(): any {
  try {
    yield put(getCountriesPending());
    const response = yield call(getAllCountries);

    const payload = yield response.data;
    yield put(getCountriesSuccess(payload));
    yield put(updateFavorites());
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
    getCountriesSuccess: (state, action: PayloadAction<ICountry[]>) => {
      state.loading = false;
      state.error = null;
      state.filteredCountries = action.payload;
      state.countries = action.payload;
      state.countries.forEach((country) => (country.favourite = false));
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
    changeFavourites: (state, action: PayloadAction<string>) => {
      const countryToChange = state.filteredCountries.find(
        (country) => country.name.common === action.payload
      );

      if (!countryToChange) return;

      if (countryToChange.favourite === true) {
        state.favourits = state.favourits.filter(
          (country) => country.name.common !== countryToChange?.name.common
        );
        state.filteredCountries.forEach((country) => {
          if (country.name.common === countryToChange.name.common) {
            country.favourite = false;
          }
        });
      } else {
        state.filteredCountries.forEach((country) => {
          if (country.name.common === countryToChange.name.common) {
            country.favourite = true;
          }
        });
        countryToChange.favourite = true;
        state.favourits.push(countryToChange);
      }
    },
    updateFavorites: (state) => {
      state.filteredCountries.forEach((country) => {
        state.favourits.forEach((fav) => {
          if (country.name.common === fav.name.common) {
            country.favourite = true;
            state.favourits = state.favourits.filter(
              (old) => old.name.common !== country.name.common
            );
            state.favourits.push(country);
          }
        });
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
  changeFavourites,
  updateFavorites,
} = CountriesSlice.actions;

export const selectFilteredCountries = (state: RootState) =>
  state.countries.filteredCountries;
export const selectFavourites = (state: RootState) => state.countries.favourits;
export const selectLoading = (state: RootState) => state.countries.loading;
export const selectError = (state: RootState) => state.countries.error;

export default CountriesSlice.reducer;
