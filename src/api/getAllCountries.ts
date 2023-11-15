import axios from "axios";

export const getAllCountries = () =>
  axios.get(
    "https://restcountries.com/v3.1/region/europe?fields=name,capital,flags"
  );
