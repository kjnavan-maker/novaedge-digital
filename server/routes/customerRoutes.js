const express = require("express");

const {
  createCustomer,
  getCustomers,
  deleteCustomer,
  updateCustomerStatus,
} = require("../controllers/customerController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

/*
ADMIN PROTECTED ROUTES
*/
router.post("/", protectAdmin, createCustomer);

router.get("/", protectAdmin, getCustomers);

router.delete("/:id", protectAdmin, deleteCustomer);

router.put("/:id/status", protectAdmin, updateCustomerStatus);

module.exports = router;