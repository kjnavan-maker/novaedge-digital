const express = require("express");

const {
  createInquiry,
  getInquiries,
  deleteInquiry,
  updateInquiryStatus,
  convertInquiryToCustomer,
} = require("../controllers/inquiryController");

const router = express.Router();

router.post("/", createInquiry);
router.get("/", getInquiries);
router.delete("/:id", deleteInquiry);
router.put("/:id/status", updateInquiryStatus);
router.post("/:id/convert", convertInquiryToCustomer);

module.exports = router;