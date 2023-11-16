import { useAppSelector, useAppDispatch } from "../../redux/hooks/redux-hooks";
import {
  selectFilteredCountries,
  sortCountries,
} from "../../redux/countries-slice";

import Select from "react-select";

import "./Selector.scss";

const Selector = () => {
  const dispatch = useAppDispatch();
  const filterCountries = (value: string) => {
    setTimeout(() => {
      dispatch(sortCountries(value));
    }, 500);
  };

  const countries = useAppSelector(selectFilteredCountries);
  const options = countries.map((country) => ({
    value: country.name.common,
    label: country.name.common,
  }));

  return (
    <div>
      <p>Search your country:</p>
      <Select
        options={options}
        placeholder=""
        className="selector"
        onInputChange={(choice) => filterCountries(choice)}
        onChange={(choice) => filterCountries(choice?.value as string)}
      />
    </div>
  );
};

export default Selector;
