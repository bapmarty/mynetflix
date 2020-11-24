import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import AccountNavbar from '../../layouts/account.navbar';
import Content from '../../helpers/content';

import "../../assets/scss/components/admin.home.scss";

const Admin = () => {
  return (
    <>
      <AccountNavbar />
      <FilmContent />
    </>
  );
}

const FilmContent = () => {
  const [films, setFilms] = useState([]);
  const [show, setShow] = useState("cat-content show");

  async function fetchData() {
    setFilms(await Content.getAllFilms());
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="cat-block">
        <div className="cat-title">
          <h2>Films</h2>
          <div>
            <span className="plus" ><NavLink to="/account/add/film/"><FontAwesomeIcon icon={faPlus} /></NavLink></span>
            <span className="show" onClick={() => { show === "cat-content" ? setShow("cat-content show") : setShow("cat-content")}}><FontAwesomeIcon icon={show === "cat-content" ? faAngleRight : faAngleDown} /></span>
          </div>
        </div>
        <section className={show}>
          {
            films.map((film, i) => (
              <div className="film" key={i}>
                <img src={film.poster_link} alt={film.title}/>
                <NavLink to={"/account/edit/content/film/" + film.uid} className="film-hover">
                  <div>
                    <span><FontAwesomeIcon icon={faPlusCircle} /></span>
                    <p>Voir plus</p>
                  </div>
                </NavLink>
              </div>
            ))
          }
        </section>
      </section>
    </>
  )
}

export default Admin;