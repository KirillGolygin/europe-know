/// <reference types="vite-plugin-svgr/client" />

import { useAppSelector, useAppDispatch } from "../../redux/hooks/redux-hooks";

import { selectCurrentUser } from "../../redux/users-slice";
import { openPopup } from "../../redux/popups-slice";
import { changeFavourites } from "../../redux/countries-slice";

import StarIcon from "../../assets/svg/star.svg?react";

import cn from "classnames";
import "./Star.scss";

interface StarProps {
  countryName: string;
  favourite: boolean;
}

const Star = ({ countryName, favourite }: StarProps) => {
  const dispatch = useAppDispatch();
  const changeFavouriteStatus = (name: string) =>
    dispatch(changeFavourites(name));

  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <div
      className="star"
      onClick={
        !currentUser
          ? () => dispatch(openPopup("signin"))
          : () => changeFavouriteStatus(countryName)
      }
    >
      <StarIcon className={cn("star-icon", { ["filled"]: favourite })} />
    </div>
  );
};

export default Star;
