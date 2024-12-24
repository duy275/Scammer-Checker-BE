const express = require("express");
const router = express.Router();
const reporterController = require("../controllers/reporterController");

router.get("/", reporterController.getAllReporters);

router.get("/:id", reporterController.getReporterById);

router.delete("/:id", reporterController.deleteReporter);

router.post("/create", reporterController.addReporter);

router.put("/update/:id", reporterController.updateReporter);

module.exports = router;
