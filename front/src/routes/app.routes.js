import { Switch, Redirect, Route } from "react-router-dom";

import Home from "../components/app.home";
import Login from "../components/auth.login";
import Auth from "../helpers/auth";
import Register from "../components/auth.register";

const AppRoute = () =>  {
  return (
    <Switch>
        <PrivateRoute path="/account" component={Home} />
        <PrivateRoute path="/browser" component={Home} />
        <PrivateRoute path="/browser/serie" component={Home} />
        <PrivateRoute path="/browser/film" component={Home} />
        <PrivateRoute path="/browser/search?q=" component={Home} />
        <PrivateRoute path="/browser/categorie" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/reset-password" component={Login} />
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