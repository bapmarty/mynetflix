import AccountNavbar from '../layouts/account.navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

import Content from '../helpers/content';

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

  async function fetchData() {
    setFilms(await Content.getAllFilms());
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(films);
  return (
    <>
      <section className="cat-block">
        <div className="cat-title">
          <h2>Film</h2>
          <span><FontAwesomeIcon icon={faAngleRight} /></span>
        </div>
        <section className="cat-content">
          {
            films.map((film, i) => {
              return (<img key={i} src={film.poster_link} alt={"bonsouer"}/>)
            })
          }
        </section>
      </section>
    </>
  )
}

export default Admin;