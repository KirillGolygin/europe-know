import { useEffect } from "react";

import { useAppDispatch } from "../../redux/hooks/redux-hooks";
import { getCountries } from "../../redux/countries-slice";

import "./Main.scss";

const Main = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCountries());
  }, []);
  return <div>Main</div>;
};

export default Main;
