import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux-hooks";
import { getCountries, selectLoading } from "../../redux/countries-slice";

import CountriesList from "../../components/CountriesList/CountriesList";
import Selector from "../../components/Selector/Selector";

import "./Main.scss";

const Main = () => {
  const loadingCountries = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className="main-wrapper">
      <Selector />
      <CountriesList loading={loadingCountries} />
    </div>
  );
};

export default Main;
