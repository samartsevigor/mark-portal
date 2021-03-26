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
        <Route exact path="/" component={() => <App />} />
        <Route exact path="/signup" component={() => <Signup />} />
        <Route exact path="/signin" component={() => <Signin />} />
        <Route exact path="/auth/activate/:token" component={() => <Activate />} />
      </Switch>
    </Router>
  );
};

export default Routes;