import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from "js-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTimes} from '@fortawesome/free-solid-svg-icons';

import Avatar from '../helpers/avatar';

import MyNetflixLogo from '../assets/images/mynetflix.png';

import "../assets/scss/layouts/app.navbar.scss";

const AppNavbar = () => {
  const [user, setUser] = useState({});
  const [show, setShow] = useState("navbar");
  
  async function fetchData() {
    const cookie_uid = Cookies.get("uid");
    const cookie_token = Cookies.get("access_token");
    if (cookie_uid && cookie_token) {
      var res = await fetch(`${process.env.REACT_APP_API_HOST}/user/${cookie_uid}`, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Cookies.get('access_token'),
          'Access-Control-Allow-Origin': "*"
        }
      });
      const data = await res.json();
      setUser(data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
      <div className="navbar_search">
        <form>
          <label><FontAwesomeIcon icon={faSearch} /></label>
          <input type="text" name="search" id="search" placeholder="Rechercher" autoComplete={"none"} />
        </form>
      </div>
      <div className="navbar_nav">
        <ul className="navbar_list">
          <li className="navbar_item"><NavLink to="/browser" activeClassName="active">Accueil</NavLink></li>
          <li className="navbar_item"><NavLink to="/film" activeClassName="active">Films</NavLink></li>
          <li className="navbar_item"><NavLink to="/series" activeClassName="active">Séries</NavLink></li>
          <li className="navbar_item"><NavLink to="/categories" activeClassName="active">Catégories</NavLink></li>
          <li className="navbar_item_account"><NavLink to={`/account/${user.uid}`}><Avatar id={user.avatar_id} /></NavLink></li>
        </ul>
      </div>
    </div>
  );
}

export default AppNavbar;