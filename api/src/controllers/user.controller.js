const User = require("../models/user.model.js");

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