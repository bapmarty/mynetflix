const bdd = require('./db');

/**
 * Construct the user 
 * 
 * @param {*} user User information
 */
const User = function(user) {
  this.uid = user.uid,
  this.lastname = user.lastname,
  this.firstname = user.firstname,
  this.mail = user.mail,
  this.password = user.password,
  this.secret = user.secret,
  this.phone = user.phone,
  this.avatar_id = user.avatar_id
}


/**
 * Write new user in the database
 * 
 * @param {Array<String>} newUser User information (unique id, mail, password, avatar id)
 * @param {Function} result return data or error
 */

User.create = (newUser, result) => {
  var sql = `INSERT INTO users (uid, mail, password, avatar_id) VALUE ("${newUser.uid}", "${newUser.mail}", "${newUser.password}", "${newUser.avatar_id}")`;
  bdd.query(sql, (err, res) => {
    if (err) {
      result(err, null);
      return ;
    }
    result(null, {uid: res.uid, ...newUser });
  })
}


/**
 * Get user information with the unique ID
 * 
 * @param {String} uid User unique id string
 * @param {Function} result return data or error
 */

User.getById = (uid, result) => {
  bdd.query("SELECT * FROM users WHERE uid = ?", uid, (err, res) => {
    if (err) {
      result(err, null);
      return ;
    }
    if (res.length) {
      result(null, res[0]);
      return ;
    }
    result({ kind: "not_found" }, null);
  });
}


/**
 * Get user information with the mail
 * 
 * @param {String} userMail User mail string
 * @param {Function} result return data or error
 */

User.getByMail = (userMail, result) => {
  var sql = `SELECT * FROM users WHERE mail = "${userMail}"`;
  bdd.query(sql, (err, res) => {
    if (err) {
      result(err, null);
      return ;
    }
    if (res.length) {
      result(null, res[0]);
      return ;
    }
    result({ kind: "not_found" }, null);
  });
}


/**
 * Update user information with the unique ID
 * 
 * @param {String} uid User unique id string
 * @param {Array<String>} user User information (firstname, lastname, mail, phone_number)
 * @param {Function} result return data or error
 */

User.updateById = (uid, user, result) => {
  var sql = `UPDATE users SET lastname = "${user.lastname}", firstname = "${user.firstname}", mail = "${user.mail}", phone_number = "${user.phone_number}" WHERE uid = "${uid}"`;
  bdd.query(sql, (err, res) => {
    if (err) {
      result(err, null);
      return ;
    }
    if (res.affectedRows === 0) {
      return ;
    }
    result(null, {uid: uid, ...user});
  });
}


/**
 * Update user avatar with the unique ID
 * 
 * @param {String} uid User unique id string
 * @param {Int} avatar User avatar id int
 * @param {Function} result return data or error
 */

User.updateAvatarById = (uid, avatar, result) => {
  var sql = `UPDATE users SET avatar_id = "${avatar}" WHERE uid = "${uid}"`;
  bdd.query(sql, (err, res) => {
    if (err) {
      result(err, null);
      return ;
    }
    if (res.affectedRows === 0) {
      return ;
    }
    result(null, {uid: uid, avatar_id: avatar});
  });
}


/**
 * Update user password with the unique ID
 * 
 * @param {String} uid User unique id string
 * @param {String} hash Password bcrypt hash string
 * @param {Function} result return data or error
 */

User.updatePasswordById = (uid, hash, result) => {
  var sql = `UPDATE users SET password = "${hash}" WHERE uid = "${uid}"`;
  bdd.query(sql, (err, res) => {
    if (err) {
      result(err, null);
      return ;
    }
    if (res.affectedRows === 0) {
      return ;
    }
    result(null, {message: "passwordUpdate"});
  });
}


/**
 * Delete user with the unique ID
 * 
 * @param {String} uid User unique id string
 * @param {Function} result return data or error
 */

User.deleteById = (uid, result) => {
  var sql = `DELETE FROM users WHERE uid = "${uid}"`;
  bdd.query(sql, (err, res) => {
    if (err) {
      result(err, null);
      return ;
    }
    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
      return ;
    }
    result(null, {uid: uid});
  });

}

module.exports = User;