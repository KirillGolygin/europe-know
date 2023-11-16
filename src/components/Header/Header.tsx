import { Link } from "react-router-dom";

import Popup from "../Popup/Popup";

import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <h1>
          <Link className="heading" to={"/"}>
            Europe.know
          </Link>
        </h1>
        <div className="btn-group">
          <button className="button">Login</button>
          <button className="button">Register</button>
        </div>
      </nav>

      <Popup>
        <div style={{ width: 400, height: 400, backgroundColor: "#fff" }}></div>
      </Popup>
    </header>
  );
};

export default Header;
