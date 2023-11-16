import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux-hooks";

import { selectPopup } from "../../redux/popups-slice";
import { togglePopUp, changeType } from "../../redux/popups-slice";

import Popup from "../Popup/Popup";

import "./Header.scss";

const Header = () => {
  const dispatch = useAppDispatch();
  const popup = useAppSelector(selectPopup);

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
          <button className="button" onClick={() => openPopup("signin")}>
            Login
          </button>
          <button className="button" onClick={() => openPopup("register")}>
            Register
          </button>
        </div>
      </nav>
      {popup.isOpen && (
        <Popup closePopup={() => dispatch(togglePopUp())}>
          {popup.type === "signin" ? (
            <div
              style={{ width: 400, height: 400, backgroundColor: "#fff" }}
            ></div>
          ) : (
            <div
              style={{ width: 400, height: 400, backgroundColor: "red" }}
            ></div>
          )}
        </Popup>
      )}
    </header>
  );
};

export default Header;
