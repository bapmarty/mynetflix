module.exports = app => {
  const user = require('../controllers/user.controller.js');

  const auth = require('../middlewares/auth.middleware.js');
  
  // Get an user
  app.get('/user/:uid', auth, user.getOne);
  app.get('/ressources/static/avatars/:imageFile', function (req, res) {
    res.sendFile(__basedir + '/ressources/static/avatars/' + req.params.imageFile);
  })

  // Update an user
  app.post('/user/update/:uid', auth, user.updateOne);
  app.post('/user/update/avatar/:uid', auth, user.updateAvatar);
  app.post('/user/update/password/:uid', auth, user.updatePassword);

  // Delete an user
  app.delete('/user/delete/:uid', auth, user.delete);
};