const db = require("../config/database");

const Warning = {
  getAll: (callback) => {
    db.query("SELECT * FROM warning", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM warning WHERE id =?", [id], callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM warning WHERE id =?", [id], callback);
  },

  create: (title, content, callback) => {
    db.query(
      "INSERT INTO warning (title, content) VALUES (?,?)",
      [title, content],
      callback
    );
  },

  update: (id, title, content, callback) => {
    db.query(
      "UPDATE warning SET title =?, content =? WHERE id =?",
      [title, content, id],
      callback
    );
  },
};

module.exports = Warning;
