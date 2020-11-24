import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';

import Content from '../../helpers/content';
import AccountNavbar from "../../layouts/account.navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const ContentFilm = () => {
  const [film, setFilm] = useState({});
  let { filmuid } = useParams();

  async function fetchData() {
    const filmContent = await Content.getFilm(filmuid);
    setFilm({...filmContent});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_HOST}/film/update/${Cookies.get('uid')}`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('access_token'),
        'Access-Control-Allow-Origin': "*"
      },
      body: JSON.stringify(film)
    })
    .then(res => res.json());
    window.location.reload();
  }

  useEffect(() => {
    fetchData();
  }, [film]);

  return (
    <>
      <AccountNavbar />
      <section className="film-block">
        <form method="POST" onSubmit={handleSubmit} className="form_film">
          <div className="title-poster">
            <img src={film.poster_link} alt={film.title} />
            <div className="input_title-edit">
              <input type="text" name="title" id="title" placeholder="" value={film.title} onChange={(e) => setFilm({...film, title: e.target.value})} />
              <button className="edit_button"><FontAwesomeIcon icon={faPen} /></button>
            </div>
          </div>
          <div className="trailer-video">
            <input type="text" name="trailer_link" id="trailer_link" placeholder="New video link trailer" value={film.trailer_link} onChange={(e) => {setFilm({...film, trailer_link: e.target.value})}} />
            <button className="edit_button"><FontAwesomeIcon icon={faPen} /></button>
            <iframe src={film.trailer_link}
                    frameBorder='0'
                    allowFullScreen
                    title='video'
                    width="100%"
            />
          </div>
          <div className="synopsis">
            <textarea value={film.synopsis}>{film.synopsis}</textarea>
          </div>
          <div className="poster-background">
            <Poster film={film} />
            <Background film={film} />
          </div>
          <div className="submit">
            <input type="submit" value="Appliquer les modifications" />
          </div>
        </form>
      </section>
    </>
  )
}

const Poster = (props) => {
  const [poster, setPoster] = useState("");



  return (
    <section className="poster">
      <div className="input_block">
        <input type="file" name="poster" id="poster" onChange={(e) => {setPoster(e.target.value)}} />
        <label htmlFor="poster">{poster === "" ? "Choisir un poster" : poster.split("\\").pop()}</label>
        <p>Une image aux dimensions minimum de 150x224</p>
      </div>
      <div>
        <img src={props.film.poster_link} alt={props.film.title} />
      </div>
    </section>
  )
}

const Background = (props) => {
  const [background, setBackground] = useState("");

  return (
    <section className="background">
      <div className="input_block">
        <input type="file" name="background" id="background" onChange={(e) => {setBackground(e.target.value)}} />
        <label htmlFor="background">{background === "" ? "Choisir une image d'arrière plan" : background.split("\\").pop()}</label>
        <p>Une image aux dimensions minimum de 1920x1080</p>
      </div>
      <div>
        <img src={props.film.background_link} alt={props.film.title} />
      </div>
    </section>
  )
}

export default ContentFilm;
