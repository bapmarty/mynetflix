import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import AccountNavbar from '../layouts/account.navbar';

import Password from '../helpers/password';

import "../assets/scss/components/account.home.scss";

const Account = () => {
  const [user, setUser] = useState({});

  const [readOnlyFisrtname, setreadOnlyFisrtname] = useState(true);
  const [readOnlyLastname, setreadOnlyLastname] = useState(true);
  const [readOnlyMail, setreadOnlyMail] = useState(true);
  const [readOnlyPhone, setreadOnlyPhone] = useState(true);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");

  const [showOldPassword, setShowOldPassword] = useState("password");
  const [showNewPassword, setShowNewPassword] = useState("password");
  const [showNewPasswordRepeat, setShowNewPasswordRepeat] = useState("password");
  
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
            <section className="submit-profil">
              <input className="submit-profil" type="submit" value="Mettre à jour mon profil" />
            </section>
          </form>
        </div>
        <div className="account-block">
          <h3>Changer de mot de passe</h3>
          <form className="password-form">
          <section>
              <div className="password-form-input">
                <label>Votre ancien mot de passe</label>
                <input type={showOldPassword} name="old-password" id="old-password" value={oldPassword} onChange={(e) => { setOldPassword(e.target.value) }} placeholder={"Saisissez votre ancien mot de passe"} required/>
                <div onClick={(e) => {e.preventDefault(); setShowOldPassword(showOldPassword === "text" ? "password" : "text");}}><FontAwesomeIcon icon={showOldPassword === "text" ? faEyeSlash : faEye} /></div>
              </div>
            </section>
            <section>
              <div className="password-form-input">
                <label>Votre nouveau mot de passe</label>
                <input type={showNewPassword} name="new-password" id="new-password" value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} placeholder={"Votre nouveau mot de passe"} required/>
                <div onClick={(e) => {e.preventDefault(); setShowNewPassword(showNewPassword === "text" ? "password" : "text");}}><FontAwesomeIcon icon={showNewPassword === "text" ? faEyeSlash : faEye} /></div>
                <span className={newPassword.length > 0 ? (Password.verify(newPassword) ? "great" : "not-great") : ""}>8 Caractères min, 1 Majuscule, 1 Chiffre, 1 Caractère spécial</span>
              </div>
              <div className="password-form-input">
                <label>Répétez le nouveau mot de passe</label>
                <input type={showNewPasswordRepeat} name="new-password-repeat" id="new-password-repeat" value={newPasswordRepeat} onChange={(e) => { setNewPasswordRepeat(e.target.value) }} placeholder={"Répétez le nouveau mot de passe"} required/>
                <div onClick={(e) => {e.preventDefault(); setShowNewPasswordRepeat(showNewPasswordRepeat === "text" ? "password" : "text");}}><FontAwesomeIcon icon={showNewPasswordRepeat === "text" ? faEyeSlash : faEye} /></div>
                {
                  newPassword.length > 0 ? (
                    newPassword === newPasswordRepeat ?
                      (<span>Le mot de passe correspond !</span>) : 
                      (<span>Le mot de passe ne correspond pas !</span>)
                  ) :
                  (<></>)
                }
              </div>
            </section>
            <section className="submit-password">
              <input type="submit" value="Mettre à jour le mot de passe" />
            </section>
          </form>
        </div>
      </div>
      <p className="alert-account">Il n'est pas encore possible de mettre à jour les informations personnelles !</p>
    </>
  );
}

export default Account;