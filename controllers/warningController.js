const Warning = require("../models/warning");

exports.getAllWarnings = (req, res) => {
  Warning.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

exports.getWarningById = (req, res) => {
  const { id } = req.params;
  Warning.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result) return res.status(404).json({ message: "Warning not found" });
    res.status(200).json(result);
  });
};

exports.deleteWarning = (req, res) => {
  const { id } = req.params;
  Warning.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: "Warning deleted successfully" });
  });
};

exports.addWarning = async (req, res) => {
  const { title, content } = await req.body;
  Warning.create(title, content, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res
      .status(201)
      .json({ message: "Warning added successfully", warning: result });
  });
};

exports.updateWarning = async (req, res) => {
  const { id } = req.params;
  const { title, content } = await req.body;
  await Warning.getById(id, (err, result) => {
    const currentWarning = result[0];
    const { title, content } = currentWarning;
    Warning.update(id, title, content, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res
        .status(200)
        .json({ message: "Warning updated successfully", warning: result });
    });
  });
};
