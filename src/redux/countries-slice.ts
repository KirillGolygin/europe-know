import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface Country {
  name: {
    common: string;
    oficial: string;
  };
  capital: string[];
}

interface CountriesState {
  countries: Country[];
}

const initialState: CountriesState = {
  countries: [],
};

export const CountriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
});

export const selectCountries = (state: RootState) => state.countries.countries;

export default CountriesSlice.reducer;
