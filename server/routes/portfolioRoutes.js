const express = require("express");

const {
  createPortfolio,
  getPortfolios,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getPortfolios);

router.post("/", protectAdmin, createPortfolio);

router.put("/:id", protectAdmin, updatePortfolio);

router.delete("/:id", protectAdmin, deletePortfolio);

module.exports = router;