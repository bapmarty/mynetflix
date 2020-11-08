import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import AccountNavbar from '../layouts/account.navbar';

import "../assets/scss/components/account.home.scss";

const Account = () => {
  const [user, setUser] = useState({});
  const [readOnlyFisrtname, setreadOnlyFisrtname] = useState(true);
  const [readOnlyLastname, setreadOnlyLastname] = useState(true);
  const [readOnlyMail, setreadOnlyMail] = useState(true);
  const [readOnlyPhone, setreadOnlyPhone] = useState(true);
  
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
    <>
      <AccountNavbar />
      <div className="account-container">
        <div className="account-block">
          <h3>Informations du compte</h3>
          <form className="account-form">
            <section>
              <div className="account-form-input">
                <label>Prénom :</label>
                <input type="text" name="firstname" id="firstname" onChange={(e) => { setUser({...user, firstname: e.target.value})}} value={user.firstname ? user.firstname : ""} placeholder={user.firstname ? user.firstname : "Votre prénom"} readOnly={readOnlyFisrtname} />
                <button onClick={(e) => {e.preventDefault(); setreadOnlyFisrtname(readOnlyFisrtname ? false : true)}}><FontAwesomeIcon icon={faPen} /></button>
              </div>
              <div className="account-form-input">
                <label>Nom :</label> 
                <input type="text" name="lastname" id="lastname" onChange={(e) => { setUser({...user, lastname: e.target.value})}} value={user.lastname ? user.lastname : ""} placeholder={user.lastname ? user.lastname : "Votre nom"} readOnly={readOnlyLastname}/>
                <button onClick={(e) => {e.preventDefault(); setreadOnlyLastname(readOnlyLastname ? false : true)}}><FontAwesomeIcon icon={faPen} /></button>
              </div>
            </section>
            <section>
              <div className="account-form-input">
                <label>Mail :</label> 
                <input type="text" name="mail" id="mail" onChange={(e) => { setUser({...user, mail: e.target.value})}} value={user.mail ? user.mail : ""} placeholder={user.mail ? user.mail : "Votre mail"} readOnly={readOnlyMail} />
                <button onClick={(e) => {e.preventDefault(); setreadOnlyMail(readOnlyMail ? false : true)}}><FontAwesomeIcon icon={faPen} /></button>
              </div>
              <div className="account-form-input">
                <label>téléphone :</label> 
                <input type="text" name="phone" id="phone" onChange={(e) => { setUser({...user, phone_number: e.target.value})}} value={user.phone_number ? user.phone_number : ""} placeholder={user.phone_number ? user.phone_number : "Votre numéro de téléphone"} readOnly={readOnlyPhone}/>
                <button onClick={(e) => {e.preventDefault(); setreadOnlyPhone(readOnlyPhone ? false : true)}}><FontAwesomeIcon icon={faPen} /></button>
              </div>
            </section>
          </form>
        </div>
        <div className="account-block">

        </div>
      </div>
    </>
  );
}

export default Account;