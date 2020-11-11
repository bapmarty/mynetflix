const User = require("../models/user.model.js");
const bcrypt = require('bcrypt');

/**
 * Get one user 
 * @param {Object} req Request containing the uid
 * @param {Object} res Return status and data
 */

exports.getOne = (req, res) => {
  if (!req.params.uid)
    res.status(400).send({
      message: "No uid found !"
    });
  
  User.getById(req.params.uid, (err, data) => {
    if (err) {
      if (err.kind === "not_found")
        res.status(404).send({
          message: "No found user with uid: " + req.params.uid 
        });
    } else res.status(200).send(data);
  });
}


/**
 * Update an user 
 * @param {Object} req Request containing the uid and req.body containing user information
 * @param {Object} res Return status and data
 */

exports.updateOne = (req, res) => {
  if (!req.params.uid)
    res.status(400).send({
      message: "No uid found !"
    });
  
  User.updateById(req.params.uid, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found")
        res.status(404).send({
          message: "No found user with uid: " + req.params.uid 
        });
      else
        res.status(500).send({
          message: "Error updating user with id " + req.params.uid
        });
    } else res.status(200).send(data);
  });
}


/**
 * Update an user avatar
 * @param {Object} req Request containing the uid and req.body containing user avatar
 * @param {Object} res Return status and data
 */

exports.updateAvatar = (req, res) => {
  if (!req.params.uid)
    res.status(400).send({
      message: "No uid found !"
    });
  User.updateAvatarById(req.params.uid, req.body.avatar_id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error updating user with id " + req.params.uid
      });
    } else res.status(200).send(data);
  });
}


/**
 * Update an user password
 * @param {Object} req Request containing the uid and req.body containing user password info
 * @param {Object} res Return status and data
 */

exports.updatePassword = (req, res) => {
  if (!req.params.uid)
    res.status(400).send({
      status: "400",
      message: "No uid found !"
    });
  User.getById(req.params.uid, (err, data) => {
    if (err) {
      res.status(400).send({
        status: "400",
        message: err
      });
    }
    else {
      bcrypt.compare(req.body.oldpassword, data.password, (err, result) => {
        if (!result) {
          res.status(401).send({
            status: "401",
            message: "Incorrect password"
          });
        } else {
          if ((req.body.newpassword === req.body.newpasswordrepeat) && (req.body.oldpassword !== req.body.newpassword)) {
            bcrypt.hash(req.body.newpassword, 10, (err, hash) => {  
              User.updatePasswordById(req.params.uid, hash, (err, data) => {
                if (err)
                  res.status(400).send({
                    message: "Can't change the password"
                  });
                else res.status(200).send(data);
              });
            });
          } else
            res.status(400).send({
              message: "Already same password !"
            })
        }
      });
    }
  });
}

/**
 * Delete an user 
 * @param {Object} req Request containing the uid
 * @param {Object} res Return status and data
 */

exports.delete = (req, res) => {
  if (!req.params.uid)
    res.status(400).send({
      message: "No uid found !"
    });
  
  User.deleteById(req.params.uid, (err, data) => {
    if (err) {
      if (err.kind === "not_found")
        res.status(404).send({
          message: "No found user with uid: " + req.params.uid 
        });
      else
        res.status(500).send({
          message: "Error deleting user with id " + req.params.uid
        });
    } else res.status(200).send(data);
  });
}