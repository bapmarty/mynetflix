const short = require("short-uuid");
require('dotenv').config();

const Film = require("../models/film.model.js");

exports.add = async (req, res) => {
  if (!req.body && !req.files)
    res.status(400).send({
      message: "Nothing to add"
    });
  else {
    let film_uid = short.generate();
    try {
      req.files.background.mv(__basedir + "/ressources/static/films/background/" + film_uid + "." + req.files.background.mimetype.split('/')[1]);
      req.files.poster.mv(__basedir + "/ressources/static/films/poster/" + film_uid + "." + req.files.poster.mimetype.split('/')[1]);
    } catch (e) {
      res.status(500).send({ err: "Catch" });
    }
    const film = new Film({
      uid: film_uid,
      title: req.body.title,
      synopsis: req.body.synopsis,
      background_link: process.env.API_HOST + "/ressources/static/films/background/" + film_uid + "." + req.files.background.mimetype.split('/')[1],
      poster_link: process.env.API_HOST + "/ressources/static/films/poster/" + film_uid + "." + req.files.poster.mimetype.split('/')[1],
      trailer_link: req.body.trailer_link
    })

    Film.add(film, (err, data) => {
      if (err)
        res.status(400).send({
          err: err
        })
      else res.status(200).send(data);
    })
  }
}

exports.getAll = (req, res) => {
  Film.getAll((err, data) => {
    if (err)
      res.status(400).send({
        message: "No film found !"
      });
    else res.status(200).send(data);
  });
}

exports.getOne = (req, res) => {
  Film.getOne(req.params.filmuid, (err, data) => {
    if (err)
      res.status(400).send({
        message: "No film found !"
      });
    else res.status(200).send(data);
  });
}

exports.updateOne = (req, res) => {
  Film.updateOneById(req.body.uid, req.body, (err, data) => {
    console.log(err | data);
    if (err)
      res.status(400).send({
        message: "No film found !"
      });
    else res.status(200).send(data);
  });
}