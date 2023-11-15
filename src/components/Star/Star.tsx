/// <reference types="vite-plugin-svgr/client" />

import StarIcon from "../../assets/svg/star.svg?react";

import "./Star.scss";

const Star = () => {
  return (
    <div className="star">
      <StarIcon className="star-icon" />
    </div>
  );
};

export default Star;
