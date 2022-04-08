import "./styles.css";
import "bootstrap/js/src/collapse.js";
import { ReactComponent as ValmLogo } from "assets/images/valm-Logo.svg";
import { ReactComponent as HamburguerMenu } from "assets/images/hamburguer-Menu.svg";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary navbar--container">
      <a>
        <ValmLogo />
        <span>VALM</span>
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <HamburguerMenu />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li>
            <a href="#" className="active">
              Home
            </a>
          </li>
          <li id="catalog-item">
            <a href="#">Catalog</a>
          </li>
          <li id="about-item">
            <a href="#">About</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
