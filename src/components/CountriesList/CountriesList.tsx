import { useAppSelector } from '../../redux/hooks/redux-hooks';

import CountryCard from '../CountryCard/CountryCard';
import Loader from '../Loader/Loader';

import { selectFilteredCountries } from '../../redux/countries-slice';

import './CountriesList.scss';

interface CountriesListProps {
  loading: boolean;
}

const CountriesList = ({ loading }: CountriesListProps) => {
  const countries = useAppSelector(selectFilteredCountries);

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
              favourite={country.favourite}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CountriesList;
