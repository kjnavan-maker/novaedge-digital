const express = require("express");

const {
  createService,
  getServices,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protectAdmin, createService);
router.get("/", protectAdmin, getServices);
router.put("/:id", protectAdmin, updateService);
router.delete("/:id", protectAdmin, deleteService);

module.exports = router;