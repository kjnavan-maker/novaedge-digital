const express = require("express");

const {
  createService,
  getServices,
  deleteService,
} = require("../controllers/serviceController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getServices);
router.post("/", protectAdmin, createService);
router.delete("/:id", protectAdmin, deleteService);

module.exports = router;