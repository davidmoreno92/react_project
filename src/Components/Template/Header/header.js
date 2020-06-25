import React from "react";
import { Auth } from "aws-amplify";
import { NavLink } from 'react-router-dom';
import logo from "../../../Assets/images/media/logo_admin02.png"
import './header.scss'

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

const Header = () => {
  return (
    <div className="header">
      <nav className="navbar navbar-expand-md navbar-dark fixed-top blue">
        <a className="navbar-brand" href="/">
          <img className="logoEgo" src={logo} alt="admin logo"/>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to="/events/create" className="nav-link margin creation" activeClassName="nav-link--active">
                Crear evento
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/events" className="nav-link smallmargin list" activeClassName="nav-link--active">
              Lista de eventos
              </NavLink>
            </li>
            <li className="nav-item">
              <button className="nav-link boton" onClick={signOut} tabIndex="-1" aria-disabled="true">
                CERRAR SESIÓN
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
