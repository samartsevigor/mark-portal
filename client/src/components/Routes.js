import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import App from "../App";
import Signup from "./Signup";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <App />} />
        <Route exact path="/signup" component={() => <Signup />} />
      </Switch>
    </Router>
  );
};

export default Routes;