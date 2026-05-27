const express = require("express");

const {
  createCustomer,
  getCustomers,
  deleteCustomer,
  updateCustomerStatus,
} = require("../controllers/customerController");

const router = express.Router();

router.post("/", createCustomer);
router.get("/", getCustomers);
router.delete("/:id", deleteCustomer);
router.put("/:id/status", updateCustomerStatus);

module.exports = router;