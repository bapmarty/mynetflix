module.exports = app => {
  const user = require('../controllers/user.controller.js');

  const auth = require('../middlewares/auth.middleware.js');
  
  // Get an user
  app.get('/user/:uid', auth, user.getOne);

  // Update an user
  app.put('/user/update/:uid', auth, user.updateOne)

  // Delete an user
  app.delete('/user/delete/:uid', auth, user.delete);
};