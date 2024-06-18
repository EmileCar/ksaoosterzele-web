import React from 'react';
import logo from '../../assets/img/ksaLogo.svg';
import logoInvert from '../../assets/img/ksaLogo-invert.svg';
import "./Header.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

const Header = ({ adminMode }: { adminMode?: boolean }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  if(!adminMode) {
    adminMode = false;
  }

  useEffect(() => {
    setIsNavOpen(false);
  }, [location]);

  const handleClickNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className={`header ${adminMode && "header-admin"}`}>
      <div className={`header__content ${adminMode && "admin-nav"} ${isNavOpen ? 'preload open' : 'preload'}`}>
        <Link to="/" className="header__logo--container layered-grid">
          <h1>Ksa Oosterzele</h1>
          {adminMode ? <img src={logoInvert} alt="KSA Oosterzele logo" className="header__logo" /> : <img src={logo} alt="KSA Oosterzele logo" className="header__logo" />}
        </Link>
        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <nav className={`navbar ${isNavOpen ? 'navOpen' : ''}`}>
          <ul className="menu__items">
            {isNavOpen && <h2 style={{fontStyle: "italic", paddingBottom: 10}}>Terug naar normale pagina's</h2>}
            <li className="menu__item">
              <Link className="item__link" to="/">
                Home
              </Link>
            </li>
            <li className="menu__item">
              <Link className="item__link" to="/evenementen">
                Evenementen
              </Link>
            </li>
            <li className="menu__item">
              <Link className="item__link" to="/media">
                Media
              </Link>
            </li>
            <li className="menu__item">
              <Link className="item__link" to="/inschrijven">
                Inschrijven
              </Link>
            </li>
            <li className="menu__item">
              <Link className="item__link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <label htmlFor="nav-toggle" className="toggle-button" onClick={handleClickNavToggle}>
          <span className="toggle-button-bar"></span>
          <span className="toggle-button-bar"></span>
          <span className="toggle-button-bar"></span>
        </label>
      </div>
    </header>
  );
}

export default Header;
