import Cookies from 'js-cookie';

var allFilms = {};
var film = {};

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
  },

  async getFilm(film_uid) {
    film = await fetch(`${process.env.REACT_APP_API_HOST}/film/${film_uid}/${Cookies.get('uid')}`, {
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
    return (film[0]);
  }
}

export default Content;