import { useState, useEffect } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Cookies from 'js-cookie';

import Home from "../components/app.home";

import Account from "../components/account.home";

import Content from "../components/admin.home";
import ContentFilm from "../components/admin.content.film";

import Login from "../components/auth.login";
import Register from "../components/auth.register";

import Auth from "../helpers/auth";

const AppRoute = () => {
  const [user, setUser] = useState({});

  async function fetchData() {
    setUser(await Auth.getUser());
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Switch>
        <PrivateRoute path="/account/user/:uid" component={Account} />
        <PrivateRoute path="/browser" component={Home} />
        <PrivateRoute path="/series" component={Home} />
        <PrivateRoute path="/film" component={Home} />
        <PrivateRoute path="/search?q=" component={Home} />
        <PrivateRoute path="/categories" component={Home} />
        <AdminRoute user={user} path="/account/content" component={Content} />
        <AdminRoute user={user} path="/account/edit/content/film/:filmuid" component={ContentFilm} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        {Auth.isAuth() ? (<Redirect to="/browser" />) : (<Redirect to="/login" />)}
    </Switch>
  )
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route 
      exact 
      {...rest}
      render = { props => Auth.isAuth() ? (<Component {...props} />) : (<Redirect to="/login" />)}
    />
  );
}

const AdminRoute = ({ user: user, component: Component, ...rest }) => {
  return (
    <Route 
      exact 
      {...rest}
      render = { props => Cookies.get("is_admin") === '1' ? (<Component {...props} />) : (<Redirect to={"/"} />)}
    />
  );
}

export default AppRoute;