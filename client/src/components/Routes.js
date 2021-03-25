import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import App from "../App";
import Signup from "./Signup";
import Signin from "./Signin";
import Activate from "./Activate";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact={true} component={() => <App />} />
        <Route exact={true} path="/signup" component={() => <Signup />} />
        <Route exact={true} component={() => <Signin />} />
        <Route eexact={true} path="/auth/activate/:token" component={() => <Activate />} />
      </Switch>
    </Router>
  );
};

export default Routes;