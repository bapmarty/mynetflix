import { useState, useReducer, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes} from '@fortawesome/free-solid-svg-icons';

import Auth from '../helpers/auth';

import MyNetflixLogo from '../assets/images/mynetflix.png';

import "../assets/scss/layouts/app.navbar.scss";

const AccountNavbar = () => {

  var time = new Date(new Date().getTime() + 10 * 1000);
  
  const [show, setShow] = useState("navbar");
  const [user, setUser] = useState({});
  const history = useHistory();

  const logout = () => {
    Auth.signOut();
    Cookies.set("logout", "successful", {expires: time});
    history.push("/login");
  }

  useEffect(() => {
    setUser(Auth.getUser());
  }, []);

  return (
    <div className={show + " account"}>
      <div className="navbar_logo">
        <img src={MyNetflixLogo} alt={"mynetflix logo"}/>
        <div className="navbar_responsive">
          <div className="responsive_button" onClick={() => {show === 'navbar' ? setShow('navbar open') : setShow('navbar')}}>
            <FontAwesomeIcon icon={show === 'navbar' ? faBars : faTimes} />
          </div>
        </div>
      </div>
      <div className="navbar_nav">
        <ul className="navbar_list">
          {user.admin ? (<li className="navbar_item"><NavLink to="/account/content">Contenu du site</NavLink></li>) : (<></>)}
          {user.uid ? (<li className="navbar_item"><NavLink to={"/account/user/" + user.uid}>Mon compte</NavLink></li>) : (<></>)}
          <li className="navbar_item"><NavLink to="/browser">Retour à l'accueil</NavLink></li>
          <li className="navbar_item"><button onClick={() => {logout()}}>Déconnexion</button></li>
        </ul>
      </div>
    </div>
  );
}

export default AccountNavbar;