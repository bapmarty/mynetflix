import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes} from '@fortawesome/free-solid-svg-icons';

import Auth from '../helpers/auth';

import MyNetflixLogo from '../assets/images/mynetflix.png';

import "../assets/scss/layouts/app.navbar.scss";

const AccountNavbar = () => {
  var time = new Date(new Date().getTime() + 10 * 1000);
  
  const [show, setShow] = useState("navbar");
  const history = useHistory();

  const logout = () => {
    Auth.signOut();
    Cookies.set("logout", "successful", {expires: time});
    history.push("/login");
  }

  return (
    <div className={show}>
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
          <li className="navbar_item"><button onClick={() => {logout()}}>Déconnexion</button></li>
        </ul>
      </div>
    </div>
  );
}

export default AccountNavbar;