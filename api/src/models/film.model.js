const bdd = require('./db');

const Film = function(film) {
  this.uid = film.uid,
  this.title = film.title,
  this.synopsis = film.synopsis,
  this.background_link = film.background_link,
  this.trailer_link = film.trailer_link,
  this.like_count = film.like_count,
  this.dislike_count = film.dislike_count,
  this.views = film.views
}

/**
 * Write new film in the database
 * 
 * @param {Array<String>} newFilm User information (unique id,  title, synopsis, background_link, trailer_link)
 * @param {Function} result return data or error
 */

Film.add = (newFilm, result) => {
  var sql = `INSERT INTO films (uid, title, synopsis, background_link, trailer_link) VALUE ("${newFilm.uid}", "${newFilm.title}", "${newFilm.synopsis}", "${newFilm.background_link}", "${newFilm.trailer_link}")`;
  bdd.query(sql, (err, res) => {
    if (err) {
      result(err, null);
      return ;
    }
    result(null, {uid: res.uid, ...newFilm });
  })
}

module.exports = Film;