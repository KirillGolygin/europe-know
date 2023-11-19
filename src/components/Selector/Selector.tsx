import { useAppSelector, useAppDispatch } from "../../redux/hooks/redux-hooks";
import {
  selectFilteredCountries,
  sortCountries,
  updateFavorites,
} from "../../redux/countries-slice";

import Select, { InputActionMeta } from "react-select";

import "./Selector.scss";
import { useNavigate } from "react-router-dom";

const Selector = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const filterCountries = (value: string, actionMeta?: InputActionMeta) => {
    setTimeout(() => {
      if (value === "") {
        dispatch(sortCountries(actionMeta?.prevInputValue as string));
        dispatch(updateFavorites());
      } else {
        dispatch(sortCountries(value));
        dispatch(updateFavorites());
      }
    }, 500);
  };

  const countries = useAppSelector(selectFilteredCountries);

  const redirectToInfoPage = (value: string) => {
    filterCountries(value);
    navigate(`/${value}`);
  };
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
        onChange={(choice) => redirectToInfoPage(choice?.value as string)}
      />
    </div>
  );
};

export default Selector;
