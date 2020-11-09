module.exports = app => {
  const user = require('../controllers/user.controller.js');

  const auth = require('../middlewares/auth.middleware.js');
  
  // Get an user
  app.get('/user/:uid', auth, user.getOne);

  // Update an user
  app.put('/user/update/:uid', auth, user.updateOne)
  app.put('/user/update/password/:uid', auth, user.updatePassword)

  // Delete an user
  app.delete('/user/delete/:uid', auth, user.delete);
};