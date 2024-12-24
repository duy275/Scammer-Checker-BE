const db = require("../config/database");

const Scammer = {
  getAll: (callback) => {
    // Truy vấn lấy tất cả scammers kèm thông tin reporter
    db.query(
      `SELECT s.*, 
              r.name AS reporter_name, 
              r.phonenumber AS reporter_phonenumber, 
              r.username AS reporter_username, 
              r.password AS reporter_password,   -- sửa đây
              r.email AS reporter_email 
       FROM scammer s 
       JOIN reporter r ON s.reporter_id = r.id`,
      callback
    );
  },

  getConfirmed: (callback) => {
    db.query(
      `SELECT s.*, 
              r.name AS reporter_name, 
              r.phonenumber AS reporter_phonenumber, 
              r.username AS reporter_username, 
              r.password AS reporter_password,   -- sửa đây
              r.email AS reporter_email 
       FROM scammer s 
       JOIN reporter r ON s.reporter_id = r.id
       WHERE s.s_status = 1`,
      callback
    );
  },

  getUnconfirmed: (callback) => {
    db.query(
      `SELECT s.*, 
              r.name AS reporter_name, 
              r.phonenumber AS reporter_phonenumber, 
              r.username AS reporter_username, 
              r.password AS reporter_password,   -- sửa đây
              r.email AS reporter_email 
       FROM scammer s 
       JOIN reporter r ON s.reporter_id = r.id
       WHERE s.s_status = 0`,
      callback
    );
  },

  getReject: (callback) => {
    db.query(
      `SELECT s.*, 
              r.name AS reporter_name, 
              r.phonenumber AS reporter_phonenumber, 
              r.username AS reporter_username, 
              r.password AS reporter_password,   -- sửa đây
              r.email AS reporter_email 
       FROM scammer s 
       JOIN reporter r ON s.reporter_id = r.id
       WHERE s.s_status = 2`,
      callback
    );
  },

  getByDate: (date, callback) => {
    db.query(
      `SELECT s.*, 
              r.name AS reporter_name, 
              r.phonenumber AS reporter_phonenumber, 
              r.username AS reporter_username, 
              r.password AS reporter_password,   -- sửa đây
              r.email AS reporter_email 
       FROM scammer s 
       JOIN reporter r ON s.reporter_id = r.id
       WHERE s.date = ? AND s.s_status = 1`,
      [date],
      callback
    );
  },

  getById: (id, callback) => {
    // Truy vấn lấy scammer theo ID kèm thông tin reporter
    db.query(
      `SELECT s.*, 
              r.name AS reporter_name, 
              r.phonenumber AS reporter_phonenumber, 
              r.username AS reporter_username, 
              r.password AS reporter_password,
              r.email AS reporter_email 
       FROM scammer s 
       JOIN reporter r ON s.reporter_id = r.id
       WHERE s.id = ?`,
      [id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM scammer WHERE id =?", [id], callback);
  },

  create: (
    reporter_id,
    date,
    name,
    phonenumber,
    banknumber,
    bank,
    description,
    images,
    r_status,
    callback
  ) => {
    db.query(
      "INSERT INTO scammer (reporter_id, date, name, phonenumber, banknumber, bank, description, images, r_status) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        reporter_id,
        date,
        name,
        phonenumber,
        banknumber,
        bank,
        description,
        images,
        r_status,
      ],
      callback
    );
  },

  update: (
    id,
    reporter_id,
    date,
    name,
    phonenumber,
    banknumber,
    bank,
    description,
    images,
    r_status,
    s_status,
    callback
  ) => {
    db.query(
      "UPDATE scammer SET reporter_id =?, date =?, name =?, phonenumber =?, banknumber =?, bank =?, description =?, images =?, r_status=?, s_status =? WHERE id =?",
      [
        reporter_id,
        date,
        name,
        phonenumber,
        banknumber,
        bank,
        description,
        images,
        r_status,
        s_status,
        id,
      ],
      callback
    );
  },
};

module.exports = Scammer;
