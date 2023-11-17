import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux-hooks";

import { selectPopup } from "../../redux/popups-slice";
import {
  selectCurrentUser,
  logoutUser,
  selectSigninError,
  setCurrentUserLoading,
} from "../../redux/users-slice";
import { openPopup, closePopup } from "../../redux/popups-slice";

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

  const showPopup = (type: "signin" | "register") => dispatch(openPopup(type));
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
              <Link to={"/my-countries"}>
                <button className="button">My countries</button>
              </Link>
            </>
          ) : (
            <>
              <button className="button" onClick={() => showPopup("signin")}>
                Login
              </button>
              <button className="button" onClick={() => showPopup("register")}>
                Register
              </button>
            </>
          )}
        </div>
      </nav>
      {popup.isOpen && (
        <Popup closePopup={() => dispatch(closePopup())}>
          {popup.type === "signin" ? (
            <SignInForm closePopup={() => dispatch(closePopup())} />
          ) : (
            <RegistrationForm closePopup={() => dispatch(closePopup())} />
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
