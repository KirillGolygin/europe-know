import { createAction, createSlice } from '@reduxjs/toolkit';
import { put, call } from 'redux-saga/effects';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

import { getAllCountries, getCountryInfo } from '../api';

import type { ICountry, IPickedCountry } from '../interfaces/country';
import { AxiosResponse } from 'axios';

interface CountriesState {
  countries: ICountry[];
  favourits: ICountry[];
  filteredCountries: ICountry[];
  pickedCountry: IPickedCountry | null;
  loading: boolean;
  error: string | null;
}

const initialState: CountriesState = {
  countries: [],
  favourits: [],
  pickedCountry: null,
  filteredCountries: [],
  loading: false,
  error: null
};

export function* getCountriesSaga() {
  try {
    yield put(getCountriesPending());
    const response: AxiosResponse<unknown, unknown> = yield call(getAllCountries);

    const payload: ICountry[] = yield response.data;
    yield put(getCountriesSuccess(payload));
    yield put(updateFavorites());
  } catch (error) {
    yield put(getCountriesRejected(`Произошла ошибка: ${error}`));
  }
}

export function* getCountryDetailsSaga(action: PayloadAction<string>) {
  const response: AxiosResponse<IPickedCountry[], unknown> = yield call(
    getCountryInfo,
    action.payload
  );

  const data: IPickedCountry = yield response.data[0];

  const prepearedData: IPickedCountry = {
    ...data,
    currencies: Object.keys(data.currencies),
    languages: Object.values(data.languages),
    population: Number(data.population).toLocaleString('ru')
  };

  yield put(pickCountry(prepearedData));
  yield put(updateFavorites());
}

export const CountriesSlice = createSlice({
  name: 'countries',
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
          return country.name.common.toLowerCase().includes('');
        } else {
          return country.name.common.toLowerCase().includes(action.payload.toLowerCase());
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
        if (state.pickedCountry) {
          state.pickedCountry.favourite = false;
        }
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
        if (state.pickedCountry) {
          state.pickedCountry.favourite = true;
        }
        countryToChange.favourite = true;
        state.favourits.push(countryToChange);
      }
    },
    updateFavorites: (state) => {
      state.favourits.forEach((fav) => {
        if (fav.name.common === state.pickedCountry?.name.common) {
          state.pickedCountry.favourite = true;
        }
        state.filteredCountries.forEach((country) => {
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
    clearFavourites: (state) => {
      state.favourits = initialState.favourits;
      state.filteredCountries.forEach((country) => (country.favourite = false));
    },
    pickCountry: (state, action: PayloadAction<IPickedCountry>) => {
      state.pickedCountry = action.payload;
    }
  }
});

export const GET_COUNTRIES = 'countries/getCountries';
export const getCountries = createAction(GET_COUNTRIES);

export const GET_COUNTRY_DETAILS = 'countries/getCountryDetails';
export const getCountryDetails = createAction<string>(GET_COUNTRY_DETAILS);

export const {
  getCountriesSuccess,
  getCountriesPending,
  getCountriesRejected,
  sortCountries,
  changeFavourites,
  updateFavorites,
  clearFavourites,
  pickCountry
} = CountriesSlice.actions;

export const selectCountries = (state: RootState) => state.countries.countries;
export const selectFilteredCountries = (state: RootState) => state.countries.filteredCountries;
export const selectFavourites = (state: RootState) => state.countries.favourits;
export const selectPickedCountry = (state: RootState) => state.countries.pickedCountry;
export const selectLoading = (state: RootState) => state.countries.loading;
export const selectError = (state: RootState) => state.countries.error;

export default CountriesSlice.reducer;
