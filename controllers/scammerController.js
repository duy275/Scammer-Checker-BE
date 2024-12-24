const Scammer = require("../models/scammer");

exports.getAllScammer = (req, res) => {
  Scammer.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

exports.getTodayScammers = (req, res) => {
  const today = new Date();

  // Lấy ngày, tháng, năm theo định dạng Việt Nam (DD/MM/YYYY)
  const vietnameseDate = today.toLocaleDateString("vi-VN");

  Scammer.getByDate(vietnameseDate, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

exports.getConfirmedScammer = (req, res) => {
  Scammer.getConfirmed((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

exports.getUnconfirmedScammer = (req, res) => {
  Scammer.getUnconfirmed((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

exports.getRejectedScammer = (req, res) => {
  Scammer.getReject((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

exports.getScammerById = (req, res) => {
  const { id } = req.params;
  Scammer.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result) return res.status(404).json({ message: "Scammer not found" });
    res.status(200).json(result);
  });
};

exports.deleteScammer = (req, res) => {
  const { id } = req.params;
  Scammer.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: "Scammer deleted successfully" });
  });
};

exports.addScammer = async (req, res) => {
  const {
    reporter_id,
    date,
    name,
    phonenumber,
    banknumber,
    bank,
    description,
    images,
    r_status,
  } = req.body;
  Scammer.create(
    reporter_id,
    date,
    name,
    phonenumber,
    banknumber,
    bank,
    description,
    images,
    r_status,
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res
        .status(201)
        .json({ message: "Scammer added successfully", scammer: result });
    }
  );
};

exports.updateScammer = async (req, res) => {
  const { id } = req.params;
  const {
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
  } = req.body;

  try {
    await Scammer.getById(id, (err, result) => {
      const currentScammer = result[0];
      Scammer.update(
        id,
        reporter_id || currentScammer.reporter_id,
        date || currentScammer.date,
        name || currentScammer.name,
        phonenumber || currentScammer.phonenumber,
        banknumber || currentScammer.banknumber,
        bank || currentScammer.bank,
        description || currentScammer.description,
        images || currentScammer.images,
        r_status || currentScammer.r_status,
        s_status || currentScammer.s_status
      );
    });
    res.status(200).json({
      message: "Scammer updated successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.confirmScammer = async (req, res) => {
  const { id } = req.params;
  await Scammer.getById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    const scammer = result[0];
    console.log(scammer);
    scammer.s_status = "1";
    const {
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
    } = scammer;
    Scammer.update(
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
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res
          .status(200)
          .json({ message: "Scammer confirmed successfully", scammer: result });
      }
    );
  });
};

exports.rejectScammer = async (req, res) => {
  const { id } = req.params;
  await Scammer.getById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    const scammer = result[0];
    console.log(scammer);
    scammer.s_status = "2";
    const {
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
    } = scammer;
    Scammer.update(
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
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res
          .status(200)
          .json({ message: "Scammer rejected successfully", scammer: result });
      }
    );
  });
};
