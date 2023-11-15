import { useEffect } from "react";

import { useAppDispatch } from "../../redux/hooks/redux-hooks";
import { getCountries } from "../../redux/countries-slice";

import CountriesList from "../../components/CountriesList/CountriesList";

import "./Main.scss";

const Main = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className="main-wrapper">
      <CountriesList />
    </div>
  );
};

export default Main;
