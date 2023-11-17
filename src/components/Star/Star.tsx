/// <reference types="vite-plugin-svgr/client" />

import { useAppSelector, useAppDispatch } from "../../redux/hooks/redux-hooks";

import { selectCurrentUser } from "../../redux/users-slice";
import { openPopup } from "../../redux/popups-slice";

import StarIcon from "../../assets/svg/star.svg?react";

import "./Star.scss";

const Star = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <div
      className="star"
      onClick={
        !currentUser
          ? () => dispatch(openPopup("signin"))
          : () => console.log("aaa")
      }
    >
      <StarIcon className="star-icon" />
    </div>
  );
};

export default Star;
