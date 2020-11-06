import { Switch, Redirect, Route } from "react-router-dom";

import Account from "../components/app.account";
import Home from "../components/app.home";

import Login from "../components/auth.login";
import Register from "../components/auth.register";

import Auth from "../helpers/auth";

function AppRoute() {
  return (
    <Switch>
        <PrivateRoute path="/account" component={Account} />
        <PrivateRoute path="/browser" component={Home} />
        <PrivateRoute path="/series" component={Home} />
        <PrivateRoute path="/film" component={Home} />
        <PrivateRoute path="/search?q=" component={Home} />
        <PrivateRoute path="/categories" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        {Auth.getAuth() ? (<Redirect to="/browser" />) : (<Redirect to="/login" />)}
    </Switch>
  )
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route 
    exact 
    {...rest}
    render = { props => Auth.getAuth() ? (<Component {...props} />) : (<Redirect to="/login" />)}
  />
);

export default AppRoute;