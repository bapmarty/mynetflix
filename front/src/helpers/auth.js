import Cookies from 'js-cookie';

var user = {};

const Auth = {
  
  getUser() {
    if (Cookies.get('uid') && Cookies.get('access_token')) {
      fetch(`${process.env.REACT_APP_API_HOST}/user/${Cookies.get('uid')}`, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Cookies.get('access_token'),
          'Access-Control-Allow-Origin': "*"
        }
        })
        .then(res => res.json())
        .then(data => {
          user = data;
        })
        return (user);
    }
    else
      return (false);
},

  signOut() {
    Cookies.remove('uid');
    Cookies.remove('access_token');
  }
}

export default Auth;