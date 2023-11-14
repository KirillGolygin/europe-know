import { Link } from "react-router-dom";

import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <h1 className="heading">
          <Link to={"/"}>Europe.know</Link>
        </h1>
        <div>
          <button>Login</button>
          <button>Register</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
