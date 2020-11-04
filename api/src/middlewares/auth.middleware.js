const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_JWT);
    const uid = decodedToken.uid;
    if (req.params.uid !== uid)
      throw "Invalid uid";
    else
      next();
  } catch {
    res.status(401).send({
      error: new Error('Invalid Request')
    });
  }
};