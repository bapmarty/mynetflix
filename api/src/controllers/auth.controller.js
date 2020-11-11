const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

const User = require("../models/user.model.js");
const Log = require("../helpers/log.helper.js");


/**
 * Register new user 
 * @param {Object} req Request body containing the user information
 * @param {Object} res Return status and data
 */

exports.register = (req, res) => {
  if (req.body === 0) {
    res.status(400).send({
      message: "Content can not be empty !"
    });
  }
  
  User.getByMail(req.body.mail, (err, mailUser) => {
    if (err) {
      if (err.kind === "not_found") {      
        if (req.body.password === req.body.passwordrepeat) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            const user = new User({
              uid: uuidv4(),
              mail: req.body.mail,
              password: hash,
              avatar_id: Math.floor(Math.random() * Math.floor(5)) + 1
            });
            
            User.create(user, (err, user) => {
              if (err) {
                res.status(500).send({
                  message: "Can't create new user err: " + err
                });
              }
              else {
                Log.writeRegister(user.uid);
                res.status(200).send(user);
              }
            });
          });
        }
        else {
          res.status(400).send({
            status: "400",
            message: "Password does not corresponding !"
          })
        }
      }
      else {
        res.status(500).send({
          status: "500",
          message: "Error retrieving user with the mail " + req.body.mail
        });
      }
    }
    else {
      res.status(401).send({
        status: "401",
        message: "Error can't create account with mail " + req.body.mail
      });
    }
  });
}


/**
 * Login an user 
 * @param {Object} req Request body containing user login information (mail & password)
 * @param {Object} res Return status and data
 */

exports.login = (req, res) => {
  User.getByMail(req.body.mail, (err, user) => {
    if (err)
    if (err.kind)
    res.status(404).send({
      status: "404",
      message: "No user found"
    });
    else
    res.status(500).send({
      status: "500",
      message: "An error as occured"
    })
    else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!result) {
          res.status(401).send({
            status: "401",
            message: "Password incorrect"
          });
          return ;
        }
        const token = jwt.sign(
          {uid: user.uid },
          process.env.SECRET_TOKEN_JWT,
          {expiresIn: "24h" }
        );
        Log.writeLogin(user.uid);
        res.send({
            uid: user.uid,
            token: token
          });
      });
    }
  });
}