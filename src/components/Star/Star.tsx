/// <reference types="vite-plugin-svgr/client" />

import { useAppSelector, useAppDispatch } from '../../redux/hooks/redux-hooks';

import { selectCurrentUser } from '../../redux/users-slice';
import { openPopup } from '../../redux/popups-slice';
import { changeFavourites } from '../../redux/countries-slice';

import StarIcon from '../../assets/svg/star.svg';

import cn from 'classnames';
import './Star.scss';

interface StarProps {
  countryName: string;
  favourite: boolean;
}

const Star = ({ countryName, favourite }: StarProps) => {
  const dispatch = useAppDispatch();
  const addToFavAfterLogin = (name: string) => {
    dispatch(openPopup('signin'));
    changeFavouriteStatus(name);
  };
  const changeFavouriteStatus = (name: string) => dispatch(changeFavourites(name));

  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <button
      className="star"
      onClick={
        !currentUser
          ? () => addToFavAfterLogin(countryName)
          : () => changeFavouriteStatus(countryName)
      }>
      <div
        data-testid="star-icon"
        className={cn('star-icon', { ['filled']: favourite && currentUser })}>
        <StarIcon />
      </div>
    </button>
  );
};

export default Star;
