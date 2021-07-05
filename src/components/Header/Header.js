import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar sticky-top navbar-light bg-light navbar-expand-md">
      <div className="container">
        <img src="./assets/logo.png" alt="logo" height="40px" width="40px" />
        <Link className="navbar-brand" to="/">
          Stock Exchange
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          style={{ justifyContent: "flex-end" }}
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
