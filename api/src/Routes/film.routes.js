
module.exports = app => {
  const film = require('../controllers/film.controller.js');
  
  const auth = require('../middlewares/auth.middleware.js');

  app.post('/film/add', auth, film.add);

  app.get('/film/all/:uid', auth, film.getAll);

  app.get('/ressources/static/films/background/:imageFile', function (req, res) {
    res.sendFile(__basedir + '/ressources/static/films/background/' + req.params.imageFile);
  })
  app.get('/ressources/static/films/poster/:imageFile', function (req, res) {
    res.sendFile(__basedir + '/ressources/static/films/poster/' + req.params.imageFile);
  })
  
 // app.update('/auth/update/:uid', film.edit);

 // app.delete('/auth/delete/:uid', film.delete);
};