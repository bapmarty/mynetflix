import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from "js-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Avatar from '../helpers/avatar';

import MyNetflixLogo from '../assets/images/mynetflix.png';

import "../assets/scss/layouts/app.navbar.scss";

const AppNavbar = () => {
  const [user, setUser] = useState({});
  
  async function fetchData() {
    const cookie_uid = Cookies.get("uid");
    const cookie_token = Cookies.get("access_token");
    if (cookie_uid && cookie_token) {
      var res = await fetch(`http://${process.env.REACT_APP_API_HOST}/user/${cookie_uid}`, {
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
    <div className="navbar">
      <div className="navbar_logo">
        <img src={MyNetflixLogo} alt={"mynetflix logo"}/>
      </div>
      <div className="navbar_search">
        <form>
          <label><FontAwesomeIcon icon={faSearch} /></label>
          <input type="text" name="search" id="search" placeholder="Rechercher" autoComplete={"none"} />
        </form>
      </div>
      <div className="navbar_block">
        <ul className="navbar_list">
          <li className="navbar_item"><NavLink to="/browser">Accueil</NavLink></li>
          <li className="navbar_item"><NavLink to="/browser/film">Films</NavLink></li>
          <li className="navbar_item"><NavLink to="/browser/series">Séries</NavLink></li>
          <li className="navbar_item"><NavLink to="/browser/categories">Catégories</NavLink></li>
          <li className="navbar_item navbar_item_account"><NavLink to="/account/"><Avatar id={user.avatar_id} /></NavLink></li>
        </ul>
      </div>
    </div>
  );
}

export default AppNavbar;