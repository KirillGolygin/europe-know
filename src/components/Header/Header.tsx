import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../redux/hooks/redux-hooks';

import {
  logoutUser,
  loginUserLoading,
  toggleRegisterStatus,
  toggleIsAlreadyRegistered
} from '../../redux/users-slice';
import { openPopup, closePopup } from '../../redux/popups-slice';
import { clearFavourites } from '../../redux/countries-slice';

import Popup from '../Popup/Popup';
import SignInForm from '../Forms/SignInForm/SigInForm';
import RegistrationForm from '../Forms/RegistrationForm/RegistrationForm';
import SigninError from '../SigninError/SigninError';
import RegisterSuccessed from '../RegisterSuccessed/RegisterSuccessed';

import type { IUser } from '../../interfaces/user';

import './Header.scss';

interface HeaderProps {
  currentUser?: IUser | null;
  popup: {
    type: 'signin' | 'register';
    isOpen: boolean;
  };
  signinError?: string | null;
  regStatus?: boolean;
  isRegistered: boolean;
}

const Header = ({ currentUser, popup, signinError, regStatus, isRegistered }: HeaderProps) => {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  const clearFavWhenClosePopup = () => {
    dispatch(closePopup());
    dispatch(clearFavourites());
  };

  const showPopup = (type: 'signin' | 'register') => dispatch(openPopup(type));
  return (
    <header className="header">
      <nav className="navbar">
        <h1>
          <Link className="heading" to={'/'}>
            Europe.know
          </Link>
        </h1>
        <div className="btn-group">
          {currentUser ? (
            <>
              <button className="button" onClick={() => logout()}>
                Logout
              </button>
              <Link to={'/my-countries'}>
                <button className="button">My countries</button>
              </Link>
            </>
          ) : (
            <>
              <button className="button" onClick={() => showPopup('signin')}>
                Login
              </button>
              <button className="button" onClick={() => showPopup('register')}>
                Register
              </button>
            </>
          )}
        </div>
      </nav>
      {popup.isOpen && (
        <Popup closePopup={clearFavWhenClosePopup}>
          {popup.type === 'signin' ? <SignInForm /> : <RegistrationForm />}
        </Popup>
      )}

      {signinError && (
        <SigninError closePopup={() => dispatch(loginUserLoading())} errorMessage={signinError} />
      )}

      {isRegistered && (
        <SigninError
          closePopup={() => dispatch(toggleIsAlreadyRegistered(false))}
          errorMessage="Пользователь с данным e-mail уже зарегестрирован"
        />
      )}

      {regStatus && (
        <RegisterSuccessed
          showSigninPopup={() => showPopup('signin')}
          closePopup={() => dispatch(toggleRegisterStatus(false))}
        />
      )}
    </header>
  );
};

export default Header;
