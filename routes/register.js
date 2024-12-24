const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../config/database"); // Import kết nối MySQL
const router = express.Router();

// Đăng ký người dùng
router.post("/register", (req, res) => {
  const { name, username, phonenumber, email, password } = req.body;

  // Kiểm tra nếu tên đăng nhập, số điện thoại hoặc email đã tồn tại
  const checkQuery = `
      SELECT * FROM reporter WHERE username = ? OR email = ? OR phonenumber = ?
    `;

  db.query(checkQuery, [username, email, phonenumber], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi server!" });
    }

    // Kiểm tra nếu đã tồn tại tên đăng nhập, email hoặc số điện thoại
    if (results.length > 0) {
      let message = "";

      // Kiểm tra cụ thể từng trường hợp
      if (results.some((row) => row.username === username)) {
        message += "Tên đăng nhập đã tồn tại. ";
      }
      if (results.some((row) => row.email === email)) {
        message += "Email đã tồn tại. ";
      }
      if (results.some((row) => row.phonenumber === phonenumber)) {
        message += "Số điện thoại đã tồn tại. ";
      }

      return res.status(400).json({ message });
    }

    // Mã hóa mật khẩu
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi khi mã hóa mật khẩu" });
      }

      // Thêm người dùng mới vào database
      const insertQuery = `
          INSERT INTO reporter (name, username, phonenumber, email, password)
          VALUES (?, ?, ?, ?, ?)
        `;

      db.query(
        insertQuery,
        [name, username, phonenumber, email, hashedPassword],
        (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Lỗi khi thêm người dùng mới" });
          }
          return res.status(201).json({ message: "Đăng ký thành công" });
        }
      );
    });
  });
});

module.exports = router;
