module.exports = app => {
  const auth = require('../controllers/auth.controller.js');

  app.post('/auth/register', auth.register);
  
  app.post('/auth/login', auth.login);

  //app.get('/auth.logout', auth, auth.logout);
};