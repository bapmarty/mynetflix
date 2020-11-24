
module.exports = app => {
  const film = require('../controllers/film.controller.js');
  
  const auth = require('../middlewares/auth.middleware.js');

  app.post('/film/add', auth, film.add);

  app.get('/film/all/:uid', auth, film.getAll);
  app.get('/film/:filmuid/:uid', auth, film.getOne);

  app.get('/ressources/static/films/background/:imageFile', function (req, res) {
    res.sendFile(__basedir + '/ressources/static/films/background/' + req.params.imageFile);
  })
  app.get('/ressources/static/films/poster/:imageFile', function (req, res) {
    res.sendFile(__basedir + '/ressources/static/films/poster/' + req.params.imageFile);
  })
  
  app.post('/film/update/:uid', auth, film.updateOne);
};