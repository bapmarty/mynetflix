import Cookies from 'js-cookie';

var allFilms = {};

const Content = {
  async getAllFilms() {
    allFilms = await fetch(`${process.env.REACT_APP_API_HOST}/film/all/${Cookies.get('uid')}`, {
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
      })
    return (allFilms);
  }
}

export default Content;