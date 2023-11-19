import axios from "axios";

export const getCountryInfo = (fullname: string) =>
  axios.get(
    `https://restcountries.com/v3.1/name/${fullname}?fields=name,currencies,region,capital,languages,population,flags,coatOfArms`
  );
