import { useAppSelector, useAppDispatch } from "../../redux/hooks/redux-hooks";
import {
  selectFilteredCountries,
  sortCountries,
} from "../../redux/countries-slice";

import Select, { InputActionMeta } from "react-select";

import "./Selector.scss";

const Selector = () => {
  const dispatch = useAppDispatch();
  const filterCountries = (value: string, actionMeta?: InputActionMeta) => {
    setTimeout(() => {
      if (value === "") {
        dispatch(sortCountries(actionMeta?.prevInputValue as string));
      } else {
        dispatch(sortCountries(value));
      }
    }, 500);
  };

  const countries = useAppSelector(selectFilteredCountries);
  const options = countries.map((country) => ({
    value: country.name.common,
    label: country.name.common,
  }));

  return (
    <div className="selector-container">
      <p className="selector-text">Search your country:</p>
      <Select
        options={options}
        placeholder=""
        className="selector"
        backspaceRemovesValue
        isClearable
        onInputChange={(choice, actionMeta) =>
          filterCountries(choice, actionMeta)
        }
        onChange={(choice) => filterCountries(choice?.value as string)}
      />
    </div>
  );
};

export default Selector;
