const express = require("express");

const {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  updateCustomerStatus,
} = require("../controllers/customerController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protectAdmin, createCustomer);

router.get("/", protectAdmin, getCustomers);

router.put("/:id", protectAdmin, updateCustomer);

router.put("/:id/status", protectAdmin, updateCustomerStatus);

router.delete("/:id", protectAdmin, deleteCustomer);

module.exports = router;