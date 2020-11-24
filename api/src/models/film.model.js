const bdd = require('./db');

const Film = function(film) {
  this.uid = film.uid,
  this.title = film.title,
  this.synopsis = film.synopsis,
  this.background_link = film.background_link,
  this.poster_link = film.poster_link,
  this.trailer_link = film.trailer_link,
  this.like_count = film.like_count,
  this.dislike_count = film.dislike_count,
  this.views = film.views
}


/**
 * Write new film in the database
 * 
 * @param {Array<String>} newFilm Film information (unique id,  title, synopsis, background_link, poster_link, trailer_link)
 * @param {Function} result return data or error
 */

Film.add = (newFilm, result) => {
  var sql = `INSERT INTO films (uid, title, synopsis, background_link, poster_link, trailer_link) VALUE ("${newFilm.uid}", "${newFilm.title}", "${newFilm.synopsis}", "${newFilm.background_link}", "${newFilm.poster_link}", "${newFilm.trailer_link}")`;
  bdd.query(sql, (err, res) => {
    if (err) {
      result(err, null);
      return ;
    }
    result(null, {uid: res.uid, ...newFilm });
  })
}


/**
 * Get all films in the database
 * 
 * @param {Function} result return data or error
 */

Film.getAll = (result) => {
  var sql = `SELECT * FROM films`;
  bdd.query(sql, (err, res) => {
    if (err) {
      result(err, null);
      return ;
    }
    result(null, res);
  })
}


/**
 * Get one films in the database
 * 
 * @param {Function} result return data or error
 */

Film.getOne = (film_uid, result) => {
  var sql = `SELECT * FROM films WHERE uid = "${film_uid}"`;
  bdd.query(sql, (err, res) => {
    if (err) {
      result(err, null);
      return ;
    }
    result(null, res);
  })
}


/**
 * Update film in the database
 * 
 * @param {String} film_uid Film unique id
 * @param {Array<String>} update Film information (unique id,  title, synopsis, background_link, poster_link, trailer_link)
 * @param {Function} result return data or error
 */

Film.updateOneById = (film_uid, update, result) => {
  var sql = `UPDATE films SET title = "${update.title}", synopsis = "${update.synopsis}", trailer_link = "${update.trailer_link}" WHERE uid = "${film_uid}"`;
  bdd.query(sql, (err, res) => {
    if (err) {
      result(err, null);
      return ;
    }
    if (res.affectedRows === 0) {
      return ;
    }
    result(null, {...update});
  })
}

module.exports = Film;