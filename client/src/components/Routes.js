import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import App from "../App";
import Signup from "./Signup";
import Signin from "./Signin";
import Activate from "./Activate";
import Private from "./Private";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Admin from "./Admin";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <App />} />
        <Route exact path="/signup" component={() => <Signup />} />
        <Route exact path="/signin" component={() => <Signin />} />
        <Route exact path="/auth/activate/:token" component={() => <Activate />} />
        <PrivateRoute exact path="/private" component={() => <Private />} />
        <AdminRoute exact path="/admin" component={() => <Admin />} />
      </Switch>
    </Router>
  );
};

export default Routes;