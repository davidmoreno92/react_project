import React from "react";
import { Auth } from "aws-amplify";
import { NavLink, Link } from 'react-router-dom';
import logo from "../../../Assets/images/media/logo_admin02.png"
import './header.scss'

async function signOut() {
  try {
    await Auth.signOut();
    window.location.reload();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

const Header = () => {
  return (
    <div className="header">
      <nav className="navbar navbar-expand-md navbar-dark blue">
        <Link to="/">
          <img className="logoEgo" src={logo} alt="admin logo"/>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav ml-auto">
            {/*<li className="nav-item">
              <NavLink to="/events/create" className="nav-link margin creation-icon" activeClassName="nav-link--active">
                Crear evento
              </NavLink>
            </li>*/}
            <li className="nav-item">
              <NavLink to="/events" className="nav-link smallmargin list-icon" activeClassName="nav-link--active">
              Eventos
              </NavLink>
            </li>
            <li className="nav-item">
            <button type="button" className="btn btn-primary" onClick={signOut} tabIndex="-1" aria-disabled="true">CERRAR SESIÓN</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
