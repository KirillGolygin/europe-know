import { useEffect } from "react";

import { useAppDispatch } from "../../redux/hooks/redux-hooks";
import { getCountries } from "../../redux/countries-slice";

import CountriesList from "../../components/CountriesList/CountriesList";
import Selector from "../../components/Selector/Selector";

import "./Main.scss";

const Main = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className="main-wrapper">
      <Selector />
      <CountriesList />
    </div>
  );
};

export default Main;
