import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux-hooks";

import { selectPopup } from "../../redux/popups-slice";
import {
  selectCurrentUser,
  logoutUser,
  selectSigninError,
  setCurrentUserLoading,
} from "../../redux/users-slice";
import { togglePopUp, changeType } from "../../redux/popups-slice";

import Popup from "../Popup/Popup";
import SignInForm from "../SignInForm/SigInForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import SigninError from "../SigninError/SigninError";

import "./Header.scss";

const Header = () => {
  const dispatch = useAppDispatch();
  const popup = useAppSelector(selectPopup);
  const currentUser = useAppSelector(selectCurrentUser);
  const signinError = useAppSelector(selectSigninError);

  const openPopup = (type: "register" | "signin") => {
    dispatch(togglePopUp());
    dispatch(changeType(type));
  };
  return (
    <header className="header">
      <nav className="navbar">
        <h1>
          <Link className="heading" to={"/"}>
            Europe.know
          </Link>
        </h1>
        <div className="btn-group">
          {currentUser ? (
            <>
              <button className="button" onClick={() => dispatch(logoutUser())}>
                Logout
              </button>
              <button className="button">My countries</button>
            </>
          ) : (
            <>
              <button className="button" onClick={() => openPopup("signin")}>
                Login
              </button>
              <button className="button" onClick={() => openPopup("register")}>
                Register
              </button>
            </>
          )}
        </div>
      </nav>
      {popup.isOpen && (
        <Popup closePopup={() => dispatch(togglePopUp())}>
          {popup.type === "signin" ? (
            <SignInForm closePopup={() => dispatch(togglePopUp())} />
          ) : (
            <RegistrationForm closePopup={() => dispatch(togglePopUp())} />
          )}
        </Popup>
      )}

      {signinError && (
        <SigninError
          closePopup={() => dispatch(setCurrentUserLoading())}
          errorMessage={signinError}
        />
      )}
    </header>
  );
};

export default Header;
