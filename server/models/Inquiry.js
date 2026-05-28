const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    service: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Inquiry ||
  mongoose.model("Inquiry", inquirySchema);