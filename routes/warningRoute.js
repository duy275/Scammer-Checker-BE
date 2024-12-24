const express = require("express");
const router = express.Router();
const warningController = require("../controllers/warningController");

router.get("/", warningController.getAllWarnings);

router.get("/:id", warningController.getWarningById);

router.delete("/:id", warningController.deleteWarning);

router.post("/create", warningController.addWarning);

router.put("/:id", warningController.updateWarning);

module.exports = router;
