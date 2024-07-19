import logo from '../../assets/img/ksaLogo.svg';
import logoInvert from '../../assets/img/ksaLogo-invert.svg';
import "./Header.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

const Header = ({ adminMode }: { adminMode?: boolean }) => {
	const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
	const location = useLocation();

	useEffect(() => {
		setIsNavOpen(false);
	}, [location]);

	const handleClickNavToggle = () => {
		setIsNavOpen(!isNavOpen);
	};

	return (
		<header className={`header ${adminMode && "header-admin"}`}>
			<div className={`header__content ${adminMode && "admin-nav"} ${isNavOpen && 'open' }`}>
				<Link to="/" className="header__logo--container layered-grid">
					<h1>Ksa Oosterzele</h1>
					{adminMode ? <img src={logoInvert} alt="KSA Oosterzele logo" className="header__logo" /> : <img src={logo} alt="KSA Oosterzele logo" className="header__logo" />}
				</Link>
				<input type="checkbox" id="nav-toggle" className="nav-toggle" />
				<nav className={`navbar ${isNavOpen ? 'navOpen' : ''}`}>
					<ul className="menu__items">
						{(isNavOpen && adminMode) && <h2 style={{fontStyle: "italic", paddingBottom: 10}}>Terug naar normale pagina's</h2>}
						<li className="menu__item">
							<Link className="item__link" to="/">
								Home
							</Link>
						</li>
						<li className="menu__item">
							<Link className="item__link" to="/leiding">
								Onze leiding
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
				<span className='pi pi-bars toggle-button' style={{ fontSize: '3rem' }} onClick={handleClickNavToggle}></span>
			</div>
		</header>
	);
}

export default Header;
