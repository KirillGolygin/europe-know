import { useAppSelector } from "../../redux/hooks/redux-hooks";

import { selectFavourites } from "../../redux/countries-slice";

import FavouritesList from "../../components/FavouritesList/FavouritesList";

import "./MyCountries.scss";

const MyCountries = () => {
  const favourites = useAppSelector(selectFavourites);
  return (
    <div className="myCountries-wrapper">
      {favourites.length !== 0 ? (
        <FavouritesList />
      ) : (
        <p className="empty-fav">Список избранных пусть...</p>
      )}
    </div>
  );
};

export default MyCountries;
