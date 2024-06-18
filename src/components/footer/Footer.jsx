import React from 'react';
import './Footer.css';
import logo from '../../assets/img/ksaLogo-invert.svg'
import instaIcon from '../../assets/img/icons/instaIcon.svg'
import facebookIcon from '../../assets/img/icons/facebookIcon.svg'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="socials__container">
          <h2>Volg ons op onze socials</h2>
          <div className="socials">
            <a href="https://www.facebook.com/KSA.Oosterzele" className="social__item">
              <img src={facebookIcon} className="social__icon" alt="Facebook" />
              <h3>Facebook</h3>
            </a>
            <a href="https://www.instagram.com/ksaoosterzele/" className="social__item">
              <img src={instaIcon} className="social__icon" alt="Instagram" />
              <h3>Instagram</h3>
            </a>
          </div>
        </div>
        <div className="details__container">
          <div>
            <p>Achterdries 31c 9860 Oosterzele</p>
          </div>
          <img src={logo} alt="KSA Logo" />
        </div>
      </div>
      <p className="copyright__text">
        Website gemaakt door <a href="https://www.emilecaron.be" style={{ color: 'inherit' }}>Emile Caron</a>
      </p>
    </footer>
  );
}

export default Footer;
