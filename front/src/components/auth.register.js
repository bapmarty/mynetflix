import { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';

import "../assets/scss/components/login.scss";

import Logo from '../assets/images/mynetflix.png';


const Register = () => {
  const history = useHistory();
  
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [err, setErr] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_HOST}/auth/register`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*"
      },
      body: JSON.stringify({
        'mail': mail,
        'password': password,
        'passwordrepeat': passwordRepeat
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.uid) {
        history.push('/login');
      }
      if (data.status === '400')
        setErr("Les mots de passes ne correspondent pas !");
      else if (data.status === '401')
        setErr("L'adresse mail est déjà associée à un compte !");
      else
        setErr("Impossible de créer le compte !");
    });
  }

  return (
    <div className={"form"}>
      <div className={"content-form"}>
          <div className={"block"}>
            <img src={Logo} alt={"Logo MyNetflix"}/>
          </div>
          <div className={"block"}>
            <h3>S'inscrire</h3>
            <form onSubmit={handleSubmit}>
              {err ? (<div className="error">{err}</div>) : (<></>)}
              <div>
                <div className="input-block">
                  <input name={"mail"} type="mail" id="mail" onChange={e => setMail(e.target.value)} value={mail} placeholder={"Adresse mail"} autoComplete={"false"} required />
                  <label htmlFor="mail">Adresse mail</label>
                </div>
                <div className="input-block">
                  <input name={"password"} type="password" id="password" onChange={e => setPassword(e.target.value)} value={password} placeholder={"Mot de passe"} autoComplete={"false"} required />
                  <label htmlFor="password">Mot de passe</label>
                </div>
                <div className="input-block">
                  <input name={"password-repeat"} type="password" id="password-repeat" onChange={e => setPasswordRepeat(e.target.value)} value={passwordRepeat} placeholder={"Répétez le mot de passe"} autoComplete={"false"} required />
                  <label htmlFor="password-repeat">Répétez le mot de passe</label>
                </div>
              </div>
              <div>
                <input type="submit" value="S'inscrire" />
              </div>
              <div>
                <NavLink to="/login">Se connecter</NavLink>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
}

export default Register;