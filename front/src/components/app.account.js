import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import Auth from '../helpers/auth';

const Account = () => {
  const history = useHistory();
  var time = new Date(new Date().getTime() + 10 * 1000);
  const logout = () => {
    Auth.signOut();
    Cookies.set("logout", "successful", {expires: time});
    history.push("/login");
  }

  return (
    <>
      <button onClick={() => { logout() } }>Déconnexion</button>
    </>
  );
}

export default Account;