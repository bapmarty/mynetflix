import { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import Auth from '../helpers/auth';

import MyNetflixLogo from '../assets/images/mynetflix.png';

import "../assets/scss/layouts/app.navbar.scss";

const AccountNavbar = () => {

  var time = new Date(new Date().getTime() + 10 * 1000);
  
  const [user, setUser] = useState({avatar:  process.env.REACT_APP_API_HOST + "/ressources/static/avatars/avatar_1.png"});
  const [show, setShow] = useState("navbar");
  const history = useHistory();

  async function fetchData() {
    setUser(await Auth.getUser());
  }

  
  const logout = () => {
    Auth.signOut();
    Cookies.set("logout", "successful", {expires: time});
    history.push("/login");
  }

  useEffect(() => {
    fetchData();
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
          {Cookies.get("is_admin") === '1' ? (<li className="navbar_item"><NavLink to="/account/content">Contenu du site</NavLink></li>) : (<></>)}
          <li className="navbar_item"><NavLink to="/browser">Retour à l'accueil</NavLink></li>
          <li className="navbar_item"><button onClick={() => {logout()}}>Déconnexion</button></li>
          <li className="navbar_item_account"><NavLink to={`/account/user/${user.uid}`}><img src={user.avatar} alt={"User account logo"} /></NavLink></li>
        </ul>
      </div>
    </div>
  );
}

export default AccountNavbar;