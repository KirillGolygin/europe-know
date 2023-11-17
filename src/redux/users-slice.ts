import { createAction, createSlice } from "@reduxjs/toolkit";
import { put, call } from "redux-saga/effects";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface CountriesState {
  currentUser: {
    token: string;
  };
}

const initialState: CountriesState = {
  currentUser: {
    token: "",
  },
};

export function* regUserSaga(): any {}

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const GET_COUNTRIES = "countries/getCountries";
export const getCountries = createAction(GET_COUNTRIES);

export const {} = usersSlice.actions;

export const selectFilteredCountries = (state: RootState) =>
  state.countries.filteredCountries;
export const selectLoading = (state: RootState) => state.countries.loading;
export const selectError = (state: RootState) => state.countries.error;

export default usersSlice.reducer;
