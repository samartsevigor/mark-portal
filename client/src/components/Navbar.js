import React from 'react'
import {Link, NavLink, withRouter} from 'react-router-dom'
import {isAuth, signout} from "./helpers";

const Navbar = ({history}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact>Home</NavLink>
            </li>
            {isAuth() && isAuth().role === 'admin' &&
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">{isAuth().name}</NavLink>
              </li>
            }
            {isAuth() && isAuth().role === 'subscriber' &&
            <li className="nav-item">
              <NavLink className="nav-link" to="/private">{isAuth().name}</NavLink>
            </li>
            }
            {!isAuth() &&
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signin">Signin</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">Signup</NavLink>
              </li>
            </>}
            {isAuth() &&
            <li className="nav-item">
              <button className="btn btn-outline-secondary" onClick={() => signout(() =>{
                history.push('/')
              })}>Signout</button>
            </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);