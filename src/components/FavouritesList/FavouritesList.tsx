import { useAppSelector } from "../../redux/hooks/redux-hooks";

import CountryCard from "../CountryCard/CountryCard";

import { selectFavourites } from "../../redux/countries-slice";

import "./FavouritesList.scss";

const FavouritesList = () => {
  const favourites = useAppSelector(selectFavourites);

  return (
    <div className="cards-grid">
      {favourites.map((country) => (
        <CountryCard
          key={country.name.common}
          name={country.name.common}
          capital={country.capital[0]}
          flag={country.flags}
          favourite={country.favourite}
        />
      ))}
    </div>
  );
};

export default FavouritesList;
