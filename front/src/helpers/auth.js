import Cookies from 'js-cookie';


const Auth = {

  isAuth() {
    if (Cookies.get('uid') && Cookies.get('access_token')) {
      try {
        fetch(`${process.env.REACT_APP_API_HOST}/user/${Cookies.get('uid')}`, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Cookies.get('access_token'),
          'Access-Control-Allow-Origin': "*"
        }
        })
        .then(res => res.json());
        return (true);
      } catch (e) {
        return (false);
      }
    }
  },

  isAdmin() {
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
          Cookies.set("is_admin", data.admin);
      });
    }    
  },
  
  async getUser() {
    let user = {};
    if (Cookies.get('uid') && Cookies.get('access_token')) {
      user = await fetch(`${process.env.REACT_APP_API_HOST}/user/${Cookies.get('uid')}`, {
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
        return data;
      });
      return user;
    }
},

  signOut() {
    Cookies.remove('uid');
    Cookies.remove('access_token');
    Cookies.remove('is_admin');
  }
}

export default Auth;