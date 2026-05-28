const express = require("express");

const {
  getSettings,
  updateSettings,
} = require("../controllers/settingController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getSettings);

router.put("/", protectAdmin, updateSettings);

module.exports = router;