const express = require("express");
const fileUpload = require('express-fileupload');
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
var cors = require("cors");
require('dotenv').config();
const app = express();

global.__basedir = __dirname;


// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use((req, res, next) => {
  const origin = req.get('Access-Control-Allow-Origin');
  
  // TODO Add origin validation
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
  
  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});

// enable files upload
app.use(fileUpload({
  createParentPath: true,
  limits: { 
    fileSize: 16000000
  },
  abortOnLimit: true
}));

// Default route
app.get('/', (req, res) => {
  console.log("[ROUTE]: /");
  res.json('hello world !');
})

// Routes imports
require('./src/Routes/user.routes.js')(app);
require('./src/Routes/auth.routes.js')(app);
require('./src/Routes/film.routes.js')(app);

// Listen
app.listen(process.env.MYNETFLIX_API_PORT, function () {
  console.log( process.env.API_HOST + ' listening on port ' + process.env.MYNETFLIX_API_PORT + '!');
})