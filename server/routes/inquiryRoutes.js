const express = require("express");

const {
  createInquiry,
  getInquiries,
  deleteInquiry,
  updateInquiryStatus,
  convertInquiryToCustomer,
} = require("../controllers/inquiryController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

/*
PUBLIC ROUTE
Website users inquiry submit pannurathu
*/
router.post("/", createInquiry);

/*
ADMIN PROTECTED ROUTES
*/
router.get("/", protectAdmin, getInquiries);

router.delete("/:id", protectAdmin, deleteInquiry);

router.put("/:id/status", protectAdmin, updateInquiryStatus);

router.post("/:id/convert", protectAdmin, convertInquiryToCustomer);

module.exports = router;