import { useAppSelector } from "../../redux/hooks/redux-hooks";

import CountryCard from "../CountryCard/CountryCard";
import Loader from "../Loader/Loader";

import {
  selectCountries,
  selectLoading,
  selectError,
} from "../../redux/countries-slice";

import "./CountriesList.scss";

const CountriesList = () => {
  const countries = useAppSelector(selectCountries);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="cards-grid">
          {countries.map((country) => (
            <CountryCard
              key={country.name.common}
              name={country.name.common}
              capital={country.capital[0]}
              flag={country.flags}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CountriesList;
