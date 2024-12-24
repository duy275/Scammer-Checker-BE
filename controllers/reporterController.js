const Reporter = require("../models/reporter");
const db = require("../config/database");

exports.getAllReporters = (req, res) => {
  Reporter.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

exports.getReporterById = (req, res) => {
  const { id } = req.params;
  Reporter.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result) return res.status(404).json({ message: "Reporter not found" });
    res.status(200).json(result);
  });
};

exports.deleteReporter = (req, res) => {
  const { id } = req.params;
  Reporter.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: "Reporter deleted successfully" });
  });
};

exports.addReporter = async (req, res) => {
  const { name, phonenumber, username, password, email } = await req.body;
  Reporter.create(
    name,
    phonenumber,
    username,
    password,
    email,
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res
        .status(201)
        .json({ message: "Reporter added successfully", reporter: result });
    }
  );
};

Reporter.getByPhoneNumberOrEmail = (phonenumber, email, currentId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM reporter WHERE (phonenumber = ? OR email = ?) AND id != ?
    `;
    db.query(query, [phonenumber, email, currentId], (err, result) => {
      if (err) reject(err);
      resolve(result.length > 0 ? result[0] : null); // Nếu tìm thấy đối tượng reporter, trả về kết quả
    });
  });
};

exports.updateReporter = async (req, res) => {
  const { id } = req.params;
  const { name, phonenumber, username, password, email } = req.body;

  try {
    // Kiểm tra xem email và số điện thoại đã tồn tại chưa, ngoại trừ tài khoản hiện tại
    const existingReporter = await Reporter.getByPhoneNumberOrEmail(
      phonenumber,
      email,
      id // Truyền id của tài khoản hiện tại để loại trừ khỏi kết quả tìm kiếm
    );

    if (existingReporter) {
      // Nếu có người khác sử dụng số điện thoại hoặc email này, trả về lỗi
      return res.status(400).json({
        message: "Số điện thoại hoặc email đã được sử dụng",
      });
    }

    // Lấy thông tin của reporter hiện tại
    const currentReporter = await Reporter.getById(id);

    // Cập nhật thông tin reporter nếu không có lỗi
    Reporter.update(
      id,
      name,
      phonenumber,
      username,
      password,
      email,
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({
          message: "Thông tin của reporter đã được cập nhật thành công",
          reporter: result,
        });
      }
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
