const db = require("../config/database");

const Reporter = {
  getAll: (callback) => {
    db.query("SELECT * FROM reporter", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM reporter WHERE id =?", [id], callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM reporter WHERE id =?", [id], callback);
  },

  create: (name, phonenumber, username, password, email, callback) => {
    db.query(
      "INSERT INTO reporter (name, phonenumber, username, password, email) VALUES (?,?,?,?,?,?)",
      [name, phonenumber, username, password, email],
      callback
    );
  },

  update: (id, name, phonenumber, username, password, email, callback) => {
    db.query(
      "UPDATE reporter SET name =?, phonenumber =?, username =?, password =?, email =? WHERE id =?",
      [name, phonenumber, username, password, email, id],
      callback
    );
  },
};

module.exports = Reporter;
