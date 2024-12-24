const express = require("express");
const router = express.Router();
const scammerController = require("../controllers/scammerController");

router.get("/", scammerController.getAllScammer);

router.get("/todayscammers", scammerController.getTodayScammers);

router.get("/unconfirmed", scammerController.getUnconfirmedScammer);

router.get("/confirmed", scammerController.getConfirmedScammer);

router.get("/rejected", scammerController.getRejectedScammer);

router.get("/:id", scammerController.getScammerById);

router.delete("/:id", scammerController.deleteScammer);

router.post("/create", scammerController.addScammer);

router.put("/:id", scammerController.updateScammer);

router.put("/confirm/:id", scammerController.confirmScammer);

router.put("/reject/:id", scammerController.rejectScammer);

module.exports = router;
