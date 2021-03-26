import React, {Component} from 'react'
import {isAuth} from "./helpers";
import {Redirect, Route} from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  let auth = isAuth()
  return (
    <Route
      {...rest}
      render={( props ) =>
        auth ? <Component {...props} /> :  <Redirect
             to={{
               pathname: "/signin",
               state: { from: props.location }
             }}
           />
      }
    />
  );
}

export default PrivateRoute