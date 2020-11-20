import { Switch, Redirect, Route } from "react-router-dom";

import Account from "../components/account.home";
import Home from "../components/app.home";
import Content from "../components/admin.home";

import Login from "../components/auth.login";
import Register from "../components/auth.register";

import Auth from "../helpers/auth";

const AppRoute = () => {
  return (
    <Switch>
        <PrivateRoute path="/account/user/:uid" component={Account} />
        <PrivateRoute path="/browser" component={Home} />
        <PrivateRoute path="/series" component={Home} />
        <PrivateRoute path="/film" component={Home} />
        <PrivateRoute path="/search?q=" component={Home} />
        <PrivateRoute path="/categories" component={Home} />
        <AdminRoute   path="/account/content" component={Content} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        {Auth.getUser().uid ? (<Redirect to="/browser" />) : (<Redirect to="/login" />)}
    </Switch>
  )
}

const PrivateRoute = ({component: Component, ...rest }) => {
  return (
    <Route 
      exact 
      {...rest}
      render = { props => Auth.getUser().uid ? (<Component {...props} />) : (<Redirect to="/login" />)}
    />
  );
}

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route 
      exact 
      {...rest}
      render = { props => Auth.getUser().admin === 1 ? (<Component {...props} />) : (<Redirect to={"/"} />)}
    />
  );
}

export default AppRoute;