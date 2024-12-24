const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database"); // Import kết nối MySQL
const router = express.Router();

// Đăng nhập người dùng
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Tìm người dùng trong bảng 'reporter'
  const query = "SELECT * FROM reporter WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (results[0].ban === "1") {
      return res.status(400).json({ error: "Tài khoản đã bị cấm đăng nhập" });
    }
    bcrypt.compare(password, results[0].password, (err, match) => {
      if (err || !match) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Tạo token JWT
      const token = jwt.sign(
        { id: results[0].id, username: results[0].username },
        "secret_key",
        { expiresIn: "1h" }
      );

      res.status(200).json({ message: "Login successful", token });
    });
  });
});

router.post("/ban/:username", (req, res) => {
  const { username } = req.params;
  const query = "SELECT * FROM reporter WHERE username =?";
  db.query(query, [username], (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const user = result[0];
    if (user.ban === "1") {
      const query1 = "UPDATE reporter SET ban = '0' WHERE username =?";
      db.query(query1, [username], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: "Tài khoản đã được mở khóa" });
      });
    } else if (user.ban === "0") {
      const query1 = "UPDATE reporter SET ban = '1' WHERE username =?";
      db.query(query1, [username], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: "Tài khoản đã bị cấm" });
      });
    }
  });
  // const query = "UPDATE reporter SET ban = '1' WHERE username =?";
  // db.query(query, [username], (err, results) => {
  //   if (err) {
  //     return res.status(500).json({ error: err });
  //   }

  //   if (results.affectedRows === 0) {
  //     return res.status(404).json({ error: "Tài khoản không tồn tại" });
  //   }

  //   res.status(200).json({ message: "Tài khoản đã bị cấm" });
  // });
});

module.exports = router;
