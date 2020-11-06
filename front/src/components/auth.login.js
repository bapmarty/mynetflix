import { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';

import "../assets/scss/components/login.scss";

import Logo from '../assets/images/mynetflix.png';

const NewLineText = (props) => {
  const text = props.text;
  return (
    <>
      {text}
    </>
  );
}


const Login = () => {
  const history = useHistory();
  
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_HOST}/auth/login`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*"
      },
      body: JSON.stringify({
        'mail': mail,
        'password': password 
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.uid) {
        if (Cookies.get("register-success"))
          Cookies.remove("register-success");
        Cookies.set('uid', data.uid);
        Cookies.set('access_token', data.token);
        history.push('/browser');
      }
      if (data.status === '404')
        setErr("Utilisateur introuvable !");
      else if (data.status === '401')
        setErr("Mot de passe incorrect !");
    });
  }

  useEffect(() => {
    if (Cookies.get("register-success") === "true") {
      setSuccess("Inscription complète !\nConnectez-vous pour finaliser votre compte.");
    }
  }, []);

  return (
    <div className={"form"}>
      <div className={"content-form"}>
          <div className={"block"}>
            <img src={Logo} alt={"Logo MyNetflix"}/>
            <p className="alert">
              Website in development !<br />
              Don't panic and stay tuned on my
              <a href="https://instagram.com/baptistemrrt/">Instagram</a>
            </p>
          </div>
          <div className={"block"}>
            <h3>Se connecter</h3>
            <form onSubmit={handleSubmit}>
              {err ? (<div className="error">{err}</div>) : (<></>)}
              {success ? (<div className="success backlines"><NewLineText text={success} /></div>) : (<></>)}
              <div>
                <div className="input-block">
                  <input name={"mail"} type="mail" id="mail" name="mail" onChange={e => setMail(e.target.value)} value={mail} placeholder={"Adresse mail"} autoComplete={"false"} required />
                  <label htmlFor="mail">Adresse mail</label>
                </div>
                <div className="input-block">
                  <input name={"password"} type="password" id="password" name="password" onChange={e => setPassword(e.target.value)} value={password} placeholder={"Mot de passe"} autoComplete={"false"} required />
                  <label htmlFor="password">Mot de passe</label>
                </div>
              </div>
              <div>
                <input type="submit" value="Se connecter" />
              </div>
              <div>
                <NavLink to="/register">S'inscrire</NavLink>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
}

export default Login;