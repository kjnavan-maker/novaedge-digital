const Inquiry = require("../models/Inquiry");
const Customer = require("../models/Customer");
const sendEmail = require("../utils/sendEmail");

const createInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);

    await Promise.all([
      sendEmail({
        to: process.env.ADMIN_NOTIFY_EMAIL,
        subject: "New Inquiry - NovaEdge Digital",
        html: `
          <h2>New Inquiry Received</h2>
          <p><strong>Name:</strong> ${inquiry.name}</p>
          <p><strong>Email:</strong> ${inquiry.email}</p>
          <p><strong>Phone:</strong> ${inquiry.phone}</p>
          <p><strong>Service:</strong> ${inquiry.service}</p>
          <p><strong>Message:</strong> ${inquiry.message}</p>
        `,
      }),

      inquiry.email
        ? sendEmail({
            to: inquiry.email,
            subject: "Thank you for contacting NovaEdge Digital",
            html: `
              <h2>Thank you, ${inquiry.name}</h2>
              <p>We received your inquiry about <strong>${inquiry.service}</strong>.</p>
              <p>Our team will contact you shortly.</p>
              <br/>
              <p>Regards,<br/>NovaEdge Digital</p>
            `,
          })
        : Promise.resolve(),
    ]);

    res.status(201).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: inquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateInquiryStatus = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const convertInquiryToCustomer = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    const customer = await Customer.create({
      name: inquiry.name,
      phone: inquiry.phone,
      email: inquiry.email,
      business: "",
      service: inquiry.service,
      budget: "",
      status: "New",
      notes: inquiry.message,
    });

    inquiry.status = "Converted";
    await inquiry.save();

    res.status(201).json({
      success: true,
      message: "Inquiry converted to customer successfully",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createInquiry,
  getInquiries,
  deleteInquiry,
  updateInquiryStatus,
  convertInquiryToCustomer,
};