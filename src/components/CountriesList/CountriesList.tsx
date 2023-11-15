import { useAppSelector } from "../../redux/hooks/redux-hooks";

import { Oval } from "react-loader-spinner";

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
        <div className="loader">
          <Oval />
        </div>
      ) : (
        <div className="cards-grid">
          {countries.map((country) => (
            <p key={country.name.common}>{country.name.common}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default CountriesList;
